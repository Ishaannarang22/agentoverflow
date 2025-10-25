import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Lightbulb, 
  Users, 
  Target, 
  Code, 
  MessageSquare, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Shield,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";

const Documentation = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "One-Click Sharing",
      description: "Instantly share successful Claude conversations with the community",
      color: "text-blue-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Smart Search",
      description: "Semantic search finds similar solved problems when you're stuck",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Browser Integration",
      description: "Seamlessly works within your Claude.ai workflow",
      color: "text-purple-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "AI Processing",
      description: "Automatically extracts titles, tags, and solutions from conversations",
      color: "text-orange-600"
    }
  ];

  const useCases = [
    {
      title: "Publishing Solutions",
      description: "When you solve a problem with Claude, our extension lets you share it instantly",
      examples: ["React useEffect infinite loop fix", "Python data processing optimization", "API integration solution"]
    },
    {
      title: "Getting Unstuck",
      description: "When you're stuck, share your chat and find similar solved problems",
      examples: ["Copy context from similar solutions", "Paste back into Claude for instant help", "Learn from community solutions"]
    },
    {
      title: "Building Knowledge Base",
      description: "Every shared solution grows our searchable repository",
      examples: ["AI extracts titles and tags automatically", "Semantic search matches problems", "Quality solutions rise to the top"]
    },
    {
      title: "Frictionless Workflow",
      description: "Seamlessly integrated with your Claude.ai experience",
      examples: ["One-click sharing when you succeed", "Smart search when you're stuck", "No disruption to your workflow"]
    }
  ];

  const guidelines = [
    {
      title: "What Makes a Good Solution",
      items: [
        "Clear problem statement and context",
        "Step-by-step solution with code examples",
        "Explanation of why this approach works",
        "Alternative solutions considered",
        "Lessons learned and best practices"
      ]
    },
    {
      title: "Community Guidelines",
      items: [
        "Be respectful and constructive in feedback",
        "Provide helpful, actionable suggestions",
        "Share knowledge freely and generously",
        "Help others learn and grow",
        "Maintain a positive, collaborative environment"
      ]
    },
    {
      title: "Quality Standards",
      items: [
        "Test your solutions before sharing",
        "Include relevant code snippets and examples",
        "Explain the reasoning behind your approach",
        "Update solutions when better approaches are found",
        "Cite sources and give credit where due"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Documentation</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our browser extension for Claude.ai and how we're creating 
            a bidirectional knowledge-sharing platform
          </p>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-orange-50 to-blue-50 border-orange-200 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                <strong>AgentOverflow</strong> is a browser extension for Claude.ai that creates a bidirectional 
                knowledge-sharing platform. When you solve problems with Claude, our extension lets you share 
                solutions instantly. When you're stuck, it finds similar solved problems to get you unstuck faster.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our browser extension seamlessly integrates with your Claude.ai workflow, capturing successful 
                conversations and making them searchable for the entire community. We're building the world's 
                largest repository of real-world AI solutions, one conversation at a time.
              </p>
              <div className="bg-white p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  To become the go-to browser extension for Claude.ai users, creating a frictionless 
                  knowledge-sharing ecosystem where every solved problem helps the next developer get unstuck faster.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* What We Do */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our browser extension captures, processes, and shares Claude AI conversations to create 
            a searchable knowledge base of real-world solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how developers are using Claude AI to solve real problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us maintain a high-quality, collaborative environment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{guideline.title}</h3>
                <ul className="space-y-3">
                  {guideline.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Getting Started</h2>
            </div>
            <p className="text-xl mb-8 opacity-90">
              Ready to install our browser extension and start sharing your Claude solutions?
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Install Extension</h3>
                <p className="text-sm opacity-90">Add our browser extension to your Chrome/Firefox</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Share Solutions</h3>
                <p className="text-sm opacity-90">One-click sharing when you solve problems with Claude</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Unstuck</h3>
                <p className="text-sm opacity-90">Find similar solutions when you're stuck on a problem</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Install Extension
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
                View Demo
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Impact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="bg-gray-50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Building the future of AI-assisted development through our browser extension
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Claude Conversations Shared</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2.5K+</div>
              <div className="text-gray-600">Extension Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Technologies Covered</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Documentation;
