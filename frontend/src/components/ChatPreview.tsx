import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Loader2 } from "lucide-react";

interface ChatPreviewProps {
  onChatData: (messages: any[]) => void;
  initialUrl?: string;
}

// Mock JSON data to display
const mockJsonData = [
  { role: "user", content: "How do I fix a React infinite loop?", timestamp: "2024-01-15T10:30:00Z" },
  { role: "assistant", content: "You can use useCallback or useMemo to prevent re-renders", timestamp: "2024-01-15T10:30:15Z" },
  { role: "user", content: "Can you show me an example?", timestamp: "2024-01-15T10:31:00Z" },
  { role: "assistant", content: "Here's how: ```const memoized = useMemo(() => value, [deps])```", timestamp: "2024-01-15T10:31:30Z" },
  { role: "user", content: "Thanks! That works perfectly.", timestamp: "2024-01-15T10:32:00Z" }
];

export const ChatPreview = ({ onChatData, initialUrl = "" }: ChatPreviewProps) => {
  const [webpageUrl, setWebpageUrl] = useState(initialUrl);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [jsonData, setJsonData] = useState<any[]>([]);

  // Auto-load data when component mounts or URL changes
  useEffect(() => {
    if (initialUrl) {
      loadData(initialUrl);
    }
  }, [initialUrl]);

  const loadData = async (url: string) => {
    if (!url.trim()) return;
    
    setIsLoadingPreview(true);
    
    try {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, use mock data
      // In production, this would fetch JSON from the URL
      setJsonData(mockJsonData);
      
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleLoadPreview = async () => {
    await loadData(webpageUrl);
  };

  // Note: onChatData is called from the parent's handleChatData when data is loaded
  // We don't call it automatically here to avoid premature step navigation

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
        <Bot className="w-5 h-5 text-orange-500" />
        <span className="font-medium text-gray-900">LLM Chat Preview</span>
      </div>

      <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter LLM Chat Share Link
          </label>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://chat.openai.com/share/abc123..."
              value={webpageUrl}
              onChange={(e) => setWebpageUrl(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLoadPreview();
                }
              }}
            />
            <Button 
              onClick={handleLoadPreview}
              disabled={!webpageUrl.trim() || isLoadingPreview}
            >
              {isLoadingPreview ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load"
              )}
            </Button>
          </div>
        </div>

        {jsonData.length > 0 ? (
          <div className="flex-1 flex flex-col overflow-hidden border border-gray-200 rounded-lg bg-white">
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Role</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Content</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {jsonData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 border-b">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          item.role === 'user' 
                            ? 'bg-gray-100 text-gray-700' 
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          {item.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b text-gray-700 whitespace-pre-wrap max-w-md">
                        {item.content}
                      </td>
                      <td className="px-4 py-3 border-b text-gray-500 text-xs">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="border-t p-4 flex flex-col gap-2 bg-white">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setJsonData([]);
                  setWebpageUrl("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
            <div className="text-center px-4">
              <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No data loaded</p>
              <p className="text-sm text-gray-400">
                Enter a shared chat link above and click "Load"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
