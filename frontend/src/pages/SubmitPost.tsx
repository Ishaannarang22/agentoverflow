import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatPreview } from "@/components/ChatPreview";
import { AIProcessingScreen } from "@/components/AIProcessingScreen";
import { EditablePostForm } from "@/components/EditablePostForm";
import { PostPreview } from "@/components/PostPreview";
import { StepNavigator } from "@/components/StepNavigator";
import { Sparkles, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SubmitPost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [chatData, setChatData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [problemDescription, setProblemDescription] = useState("");
  const [solutionDescription, setSolutionDescription] = useState("");
  const [postData, setPostData] = useState({
    headline: "",
    context: "",
    solution: "",
    architecture: "",
    tags: [] as string[]
  });
  const [extensionData, setExtensionData] = useState<any>(null);
  const [finalPostData, setFinalPostData] = useState<any>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const totalSteps = 3;

  // Listen for extension data via content script
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'AGENTOVERFLOW_DATA_RESPONSE') {
        console.log('📨 Received data from content script:', event.data.data);
        
        if (event.data.data) {
          const extensionData = event.data.data;
          setExtensionData(extensionData);
          
          // Auto-populate form with extension data
          if (extensionData.result) {
            const result = extensionData.result;
            console.log('📝 Setting post data with result:', result);
            
            setPostData({
              headline: result.title || "",
              context: result.context || "",
              solution: result.solution || "",
              architecture: result.technical_description || "",
              tags: result.tags || []
            });
            
            toast.success("Data imported from extension!");
          }
        } else {
          console.log('❌ No extension data received from content script');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Request data from content script
    setTimeout(() => {
      console.log('📤 Requesting data from content script...');
      window.postMessage({
        type: 'GET_AGENTOVERFLOW_DATA'
      }, '*');
    }, 500);
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Mock AI processing
  const processWithAI = async (messages: any[]) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate AI processing with progress updates
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // Generate mock AI content
            setPostData({
              headline: "How to Fix React useEffect Infinite Loop with Object Dependencies",
              context: "I was experiencing an infinite loop in my React useEffect hook. The dependency array included a state variable that was changing on every render, causing the effect to run continuously.",
              solution: "The issue was caused by including an object in the dependency array that gets recreated on every render. I solved it by using useMemo to memoize the object or by restructuring the dependencies to only include primitive values.",
              architecture: "Used useMemo hook to memoize the filters object, ensuring it only changes when the actual filter values change, not on every render.",
              tags: ["React", "JavaScript", "useEffect", "Performance", "Hooks"]
            });
            setCurrentStep(1);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleChatData = (messages: any[]) => {
    // Just store the chat data, don't process it yet
    setChatData(messages);
  };

  const handlePostDataChange = (data: any) => {
    setPostData(data);
  };

  const handleNext = async () => {
    if (currentStep === 2) {
      // Final step - publish the post
      console.log('🎯 FINAL STEP - Calling handlePublish');
      await handlePublish();
    } else if (currentStep === 0 && extensionData && !isProcessing) {
      // When moving from step 0 to step 1 with extension data, process with second Lava API call
      await processWithSecondLavaAPI();
    } else if (currentStep === 0 && chatData.length > 0 && !isProcessing) {
      // When moving from step 0 to step 1, trigger AI processing
      processWithAI(chatData);
      // processWithAI will set currentStep to 1 when done
    } else if (currentStep === 0 && chatData.length === 0) {
      // If no chat data, use mock data and move to step 1
      setPostData({
        headline: "How to Fix React useEffect Infinite Loop with Object Dependencies",
        context: "I was experiencing an infinite loop in my React useEffect hook. The dependency array included a state variable that was changing on every render, causing the effect to run continuously.",
        solution: "The issue was caused by including an object in the dependency array that gets recreated on every render. I solved it by using useMemo to memoize the object or by restructuring the dependencies to only include primitive values.",
        architecture: "Used useMemo hook to memoize the filters object, ensuring it only changes when the actual filter values change, not on every render.",
        tags: ["React", "JavaScript", "useEffect", "Performance", "Hooks"]
      });
      setCurrentStep(1);
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Process with second Lava API call
  const processWithSecondLavaAPI = async () => {
    if (!extensionData || !problemDescription.trim()) {
      toast.error("Please add human context before continuing");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      console.log('🔄 Processing with second Lava API call...');
      
      const response = await fetch('http://localhost:3001/api/finalize-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          extractedData: extensionData.result,
          humanContext: problemDescription,
          actionType: extensionData.actionType
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        console.log('✅ Second Lava API call successful:', data.result);
        
        // Update post data with refined information from claude_solutions format
        setPostData({
          headline: data.result.title || "",
          context: data.result.context || data.result.problem || "",
          solution: data.result.solution || "",
          architecture: data.result.technical_description || "",
          tags: data.result.tags || []
        });

        // Store the final data for publishing
        setFinalPostData(data.result);
        
        setCurrentStep(2); // Go directly to final step with publish button
        toast.success("Post refined with your context!");
      } else {
        throw new Error(data.error || 'Second Lava API call failed');
      }
    } catch (error) {
      console.error('❌ Second Lava API call error:', error);
      toast.error(`Failed to process: ${error.message}`);
    } finally {
      setIsProcessing(false);
      setProcessingProgress(100);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    console.log('🎯 HANDLE PUBLISH CALLED - Starting publish process');
    
    if (isPublishing) {
      console.log('⚠️ Already publishing, ignoring click');
      return; // Prevent double clicks
    }
    
    console.log('🔄 Setting isPublishing to true');
    setIsPublishing(true);
    
    try {
      console.log('🚀 Publish button clicked!');
      console.log('📊 Current postData:', postData);
      console.log('📊 Final post data:', finalPostData);
      console.log('📊 Extension data:', extensionData);
      console.log('📊 isPublishing state:', isPublishing);
      
      // Use finalPostData if available, otherwise use current postData
      // Ensure we populate ALL fields from the claude_solutions mapping
      const dataToPublish = finalPostData || {
        // Core fields
        title: postData.headline || '',
        problem: postData.context || '',
        context: postData.context || '',
        solution: postData.solution || '',
        summary: postData.solution || '',
        
        // Technical fields
        technical_description: postData.architecture || '',
        technical_deep_context: postData.architecture || '',
        
        // Problem-solving fields
        attempted_solutions: postData.context || '', // Use context as attempted solutions
        error_messages: '', // Will be populated by AI if available
        
        // Code snippets (ensure it's an array)
        code_snippets: [],
        
        // Metadata fields
        tags: Array.isArray(postData.tags) ? postData.tags : [],
        type: extensionData?.actionType || 'solution',
        share_link: extensionData?.shareLink || '',
        solution_id: `sol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        
        // System fields
        author_id: 'anonymous'
      };

      console.log('📤 Publishing this data:', dataToPublish);
      console.log('📤 Data structure check:', {
        hasTitle: !!dataToPublish.title,
        hasProblem: !!dataToPublish.problem,
        hasContext: !!dataToPublish.context,
        hasSolution: !!dataToPublish.solution,
        hasTechnicalDescription: !!dataToPublish.technical_description,
        hasTags: Array.isArray(dataToPublish.tags) && dataToPublish.tags.length > 0,
        hasAuthorId: !!dataToPublish.author_id,
        hasSolutionId: !!dataToPublish.solution_id,
        title: dataToPublish.title,
        problem: dataToPublish.problem?.substring(0, 100) + '...',
        solution: dataToPublish.solution?.substring(0, 100) + '...',
        tags: dataToPublish.tags
      });
      
      // First check if backend is reachable
      try {
        const healthCheck = await fetch('http://localhost:3002/health');
        console.log('🏥 Backend health check:', healthCheck.status);
        if (!healthCheck.ok) {
          throw new Error(`Health check failed: ${healthCheck.status}`);
        }
      } catch (healthError) {
        console.error('❌ Backend not reachable:', healthError);
        toast.error('Backend server is not running. Please start it with: npm run dev:api');
        throw new Error('Backend server is not running on port 3002. Please start the backend server.');
      }
      
      console.log('📡 Making POST request to http://localhost:3002/api/posts');
      const response = await fetch('http://localhost:3002/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPublish),
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      const result = await response.json();
      console.log('📡 Response data:', result);
      
      if (result.success) {
        console.log('✅ Post published successfully:', result.data);
        toast.success("Post published successfully!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error(result.error || 'Failed to publish post');
      }
    } catch (error) {
      console.error('❌ Publish error:', error);
      toast.error(`Failed to publish: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 0:
        if (extensionData) {
          // If we have extension data, just need human context
          return !isProcessing && problemDescription.trim() !== "";
        } else {
          // Original logic for manual input
          return !isProcessing && problemDescription.trim() !== "" && solutionDescription.trim() !== "";
        }
      case 1:
        return !isProcessing && postData.headline.trim() !== "" && postData.context.trim() !== "";
      case 2:
        return true;
      default:
        return false;
    }
  };

  const canGoPrevious = (): boolean => {
    return currentStep > 0;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tell us what you were working on
              </h2>
              <p className="text-gray-600">
                Share problems you encountered while coding with LLMs and how you solved them.
              </p>
            </div>

            {/* Two Column Layout with Vertical Divider */}
            <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Add Your Human Context
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add any additional context, personal insights, or clarifications about this solution
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Human Context
                    </label>
                    <Textarea
                      placeholder="Add your personal insights, additional context, or any clarifications about this solution..."
                      className="min-h-[200px]"
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Post Preview
                  </h3>
                  <p className="text-sm text-gray-600">
                    Preview of your post generated from the LLM conversation
                  </p>
                </div>
                
                {extensionData ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">Data imported from extension</span>
                      </div>
                      <div className="text-xs text-green-700">
                        {extensionData.actionType === 'share' ? '✅ Solution' : '🔍 Problem'} • {extensionData.shareLink}
                      </div>
                    </div>
                    
                    {/* Post Preview */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">Post Preview</h4>
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          {extensionData.actionType === 'share' ? 'Solution' : 'Problem'}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Title</h5>
                          <p className="text-sm text-gray-700">{extensionData.result?.title}</p>
                        </div>
                        
                        {extensionData.result?.problem && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Problem</h5>
                            <p className="text-sm text-gray-700">{extensionData.result.problem}</p>
                          </div>
                        )}
                        
                        {extensionData.result?.context && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Context</h5>
                            <p className="text-sm text-gray-700 line-clamp-3">{extensionData.result.context}</p>
                          </div>
                        )}
                        
                        {extensionData.result?.solution && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Solution</h5>
                            <p className="text-sm text-gray-700 line-clamp-3">{extensionData.result.solution}</p>
                          </div>
                        )}
                        
                        {extensionData.result?.tags && extensionData.result.tags.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Tags</h5>
                            <div className="flex flex-wrap gap-1">
                              {extensionData.result.tags.map((tag: string, index: number) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                        disabled={!problemDescription.trim()}
                      >
                        {problemDescription.trim() ? "Refine with AI →" : "Add Human Context First"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No data loaded</p>
                    <p className="text-gray-400 text-xs mt-1">Use the extension to import conversation data</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="h-[calc(100vh-200px)]">
            {isProcessing ? (
              <AIProcessingScreen 
                isProcessing={isProcessing} 
                progress={processingProgress} 
              />
            ) : (
              <EditablePostForm 
                initialData={postData}
                onDataChange={handlePostDataChange}
              />
            )}
          </div>
        );
        
      case 2:
        return (
          <div className="h-[calc(100vh-200px)]">
            <PostPreview 
              postData={postData}
              onEdit={() => setCurrentStep(1)}
              onPublish={handlePublish}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Share Your Solution</h1>
        </div>

        {renderStep()}
      </motion.div>

      <StepNavigator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoNext={canGoNext()}
        canGoPrevious={canGoPrevious()}
        nextLabel={currentStep === 2 ? "Publish" : "Next"}
        previousLabel="Back"
      />
    </div>
  );
};

export default SubmitPost;
