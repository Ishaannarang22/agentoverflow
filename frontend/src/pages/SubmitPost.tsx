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

  const totalSteps = 3;

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

  const handleNext = () => {
    if (currentStep === 0 && chatData.length > 0 && !isProcessing) {
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

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    toast.success("Post published successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 0:
        return !isProcessing && problemDescription.trim() !== "" && solutionDescription.trim() !== "";
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
                    Describe Your LLM Coding Problem & Solution
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What LLM coding problem did you face?
                    </label>
                    <Textarea
                      placeholder="Describe the issue you encountered while coding with LLMs (hallucinations, wrong code, context issues, etc.)..."
                      className="min-h-[120px]"
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you solve it?
                    </label>
                    <Textarea
                      placeholder="Explain your solution approach, prompts, or techniques that worked..."
                      className="min-h-[120px]"
                      value={solutionDescription}
                      onChange={(e) => setSolutionDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Import Your LLM Conversation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Share your conversation with any LLM (ChatGPT, Claude, Copilot, etc.) to automatically generate a structured post
                  </p>
                </div>
                <ChatPreview onChatData={handleChatData} />
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
