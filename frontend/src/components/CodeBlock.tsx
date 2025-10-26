import { Check, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = ({ code, language = "javascript" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyToClaude = async () => {
    const prompt = `Here's a code snippet I'd like your help with:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nCan you help me understand or improve this code?`;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden glass-card my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-glass-border">
        <span className="text-xs font-medium text-muted-foreground uppercase">
          {language}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 gap-1.5"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-3 h-3 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-3 h-3" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-xs">Copy</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyToClaude}
            className="h-7 px-2 gap-1.5 text-primary hover:text-primary"
          >
            <Sparkles className="w-3 h-3" />
            <span className="text-xs">Copy to Claude</span>
          </Button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto bg-card/50">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
};
