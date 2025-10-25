import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  nextLabel?: string;
  previousLabel?: string;
}

export const StepNavigator = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canGoNext,
  canGoPrevious,
  nextLabel = "Next",
  previousLabel = "Back"
}: StepNavigatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index < currentStep
                    ? 'bg-green-500'
                    : index === currentStep
                    ? 'bg-orange-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {canGoPrevious && (
              <Button
                variant="outline"
                onClick={onPrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {previousLabel}
              </Button>
            )}
            
            {canGoNext && (
              <Button
                onClick={onNext}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-black text-white hover:from-orange-600 hover:to-gray-800"
              >
                {nextLabel}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
