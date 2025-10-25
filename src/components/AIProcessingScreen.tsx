import { motion } from "framer-motion";
import { Brain, Sparkles, Code, FileText, Tag } from "lucide-react";

interface AIProcessingScreenProps {
  isProcessing: boolean;
  progress: number;
}

export const AIProcessingScreen = ({ isProcessing, progress }: AIProcessingScreenProps) => {
  const processingSteps = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Analyzing Chat",
      description: "Extracting problem and solution from your conversation",
      completed: progress > 20
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Understanding Context",
      description: "AI is identifying the core problem and approach",
      completed: progress > 50
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Generating Solution",
      description: "Creating structured solution summary",
      completed: progress > 80
    },
    {
      icon: <Tag className="w-5 h-5" />,
      title: "Adding Tags",
      description: "Suggesting relevant tags and categories",
      completed: progress >= 100
    }
  ];

  if (!isProcessing) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Analyzing your chat with AI...
        </h3>
        <p className="text-gray-600">
          Our AI is processing your conversation to extract the problem and solution
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        {processingSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
              step.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step.completed 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {step.completed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  ✓
                </motion.div>
              ) : (
                step.icon
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${
                step.completed ? 'text-green-800' : 'text-gray-700'
              }`}>
                {step.title}
              </h4>
              <p className={`text-sm ${
                step.completed ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.description}
              </p>
            </div>
            {step.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
