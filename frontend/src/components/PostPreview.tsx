import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageSquare, Eye, Code, User } from "lucide-react";
import { motion } from "framer-motion";

interface PostPreviewProps {
  postData: {
    headline: string;
    context: string;
    solution: string;
    architecture: string;
    tags: string[];
  };
  onEdit: () => void;
  onPublish: () => void;
}

export const PostPreview = ({ postData, onEdit, onPublish }: PostPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Post Preview
        </h2>
        <p className="text-gray-600">
          This is how your post will appear on AgentOverflow
        </p>
      </div>

      <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex gap-4">
            {/* Vote Section */}
            <div className="flex flex-col items-center gap-1 min-w-[40px]">
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8 transition-colors text-gray-400 hover:text-gray-600"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
              <span className="font-semibold text-sm text-gray-600">0</span>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8 transition-colors text-gray-400 hover:text-gray-600"
              >
                <ArrowDown className="w-5 h-5" />
              </Button>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-orange-500 transition-colors">
                {postData.headline}
              </h2>

              {/* Full Content Display */}
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Problem
                  </h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {postData.context}
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Solution
                  </h3>
                  <p className="text-green-800 text-sm leading-relaxed">
                    {postData.solution}
                  </p>
                </div>

                {postData.architecture && (
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Architecture
                    </h3>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      {postData.architecture}
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {postData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-all"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author and Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">You</span>
                  <span className="text-xs text-gray-500">
                    · {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onEdit}
          className="px-8"
        >
          Go Back and Edit
        </Button>
        <Button
          onClick={onPublish}
          className="px-8 bg-gradient-to-r from-orange-500 to-black text-white hover:from-orange-600 hover:to-gray-800"
        >
          Post to AgentOverflow
        </Button>
      </div>
    </motion.div>
  );
};
