import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, User, Bot } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatPreviewProps {
  onChatData: (messages: ChatMessage[]) => void;
}

export const ChatPreview = ({ onChatData }: ChatPreviewProps) => {
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseChatText = (text: string): ChatMessage[] => {
    // Mock parsing - in real implementation, this would parse Claude chat exports
    const lines = text.split('\n').filter(line => line.trim());
    const parsedMessages: ChatMessage[] = [];
    
    let currentMessage: ChatMessage | null = null;
    
    lines.forEach((line, index) => {
      if (line.startsWith('Human:') || line.startsWith('User:')) {
        if (currentMessage) parsedMessages.push(currentMessage);
        currentMessage = {
          id: `user-${index}`,
          role: "user",
          content: line.replace(/^(Human:|User:)\s*/, ''),
          timestamp: new Date().toISOString()
        };
      } else if (line.startsWith('Assistant:') || line.startsWith('Claude:')) {
        if (currentMessage) parsedMessages.push(currentMessage);
        currentMessage = {
          id: `assistant-${index}`,
          role: "assistant",
          content: line.replace(/^(Assistant:|Claude:)\s*/, ''),
          timestamp: new Date().toISOString()
        };
      } else if (currentMessage) {
        currentMessage.content += '\n' + line;
      }
    });
    
    if (currentMessage) parsedMessages.push(currentMessage);
    return parsedMessages;
  };

  const handleProcessChat = async () => {
    if (!chatText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const parsedMessages = parseChatText(chatText);
      setMessages(parsedMessages);
      onChatData(parsedMessages);
      setIsProcessing(false);
    }, 1000);
  };

  const mockMessages: ChatMessage[] = [
    {
      id: "1",
      role: "user",
      content: "I'm getting an infinite loop in my React useEffect. The dependency array includes a state variable that changes on every render.",
      timestamp: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      role: "assistant",
      content: "This is a common React issue! The problem is likely that you're including an object or array in your dependency array that gets recreated on every render. Here are a few solutions:\n\n1. **Use useCallback for functions**\n2. **Use useMemo for objects/arrays**\n3. **Move the dependency outside the component**\n\nCan you show me your current useEffect code?",
      timestamp: "2024-01-15T10:30:15Z"
    },
    {
      id: "3",
      role: "user",
      content: "Here's my code:\n```javascript\nuseEffect(() => {\n  fetchData(user.id, filters);\n}, [user.id, filters]);\n```\n\nThe `filters` object is created inline in the component.",
      timestamp: "2024-01-15T10:31:00Z"
    },
    {
      id: "4",
      role: "assistant",
      content: "Exactly! The `filters` object is recreated on every render, causing the infinite loop. Here's how to fix it:\n\n```javascript\n// Option 1: Use useMemo\nconst memoizedFilters = useMemo(() => filters, [filter1, filter2, filter3]);\n\nuseEffect(() => {\n  fetchData(user.id, memoizedFilters);\n}, [user.id, memoizedFilters]);\n\n// Option 2: Move filters outside useEffect\nuseEffect(() => {\n  const currentFilters = { filter1, filter2, filter3 };\n  fetchData(user.id, currentFilters);\n}, [user.id, filter1, filter2, filter3]);\n```",
      timestamp: "2024-01-15T10:31:30Z"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
        <Bot className="w-5 h-5 text-orange-500" />
        <span className="font-medium text-gray-900">LLM Chat Preview</span>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-3 pr-2">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 ${
                  message.role === 'user' 
                    ? 'bg-blue-50 border-blue-200 ml-8' 
                    : 'bg-white border-gray-200 mr-8'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-orange-500'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">
                          {message.role === 'user' ? 'You' : 'LLM'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No chat preview available</p>
              <p className="text-sm text-gray-400">
                Paste your LLM conversation or upload a chat file to see the preview
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => {
              setMessages(mockMessages);
              onChatData(mockMessages);
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Use Sample
          </Button>
        </div>
        
        <Textarea
          placeholder="Paste your LLM conversation here... (Human: ... Assistant: ...)"
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        
        <Button 
          onClick={handleProcessChat}
          disabled={!chatText.trim() || isProcessing}
          className="w-full"
        >
          {isProcessing ? "Processing..." : "Process Chat"}
        </Button>
      </div>
    </div>
  );
};
