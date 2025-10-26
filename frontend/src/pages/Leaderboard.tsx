import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Trophy, Star, TrendingUp, Users, MessageSquare, Code } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for top contributors
const topContributors = [
  {
    id: 1,
    rank: 1,
    username: "ClaudeExpert",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=claude",
    reputation: 15420,
    posts: 47,
    solutions: 89,
    votes: 2340,
    badges: ["Gold Contributor", "Problem Solver", "Code Master"],
    recentActivity: "Solved a complex React optimization issue",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    rank: 2,
    username: "AISolutionist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ai",
    reputation: 12850,
    posts: 38,
    solutions: 72,
    votes: 1890,
    badges: ["Silver Contributor", "Quick Responder", "Algorithm Expert"],
    recentActivity: "Helped with Python data processing optimization",
    joinDate: "2024-02-03"
  },
  {
    id: 3,
    rank: 3,
    username: "CodeClaude",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=code",
    reputation: 11200,
    posts: 42,
    solutions: 65,
    votes: 1650,
    badges: ["Bronze Contributor", "Debugging Pro", "Frontend Expert"],
    recentActivity: "Shared TypeScript best practices",
    joinDate: "2024-01-28"
  },
  {
    id: 4,
    rank: 4,
    username: "DevHelper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev",
    reputation: 9850,
    posts: 35,
    solutions: 58,
    votes: 1420,
    badges: ["Community Helper", "Backend Specialist"],
    recentActivity: "Solved database optimization challenge",
    joinDate: "2024-02-10"
  },
  {
    id: 5,
    rank: 5,
    username: "SolutionMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=solution",
    reputation: 8750,
    posts: 29,
    solutions: 51,
    votes: 1280,
    badges: ["Problem Solver", "Full-Stack Expert"],
    recentActivity: "Created comprehensive API documentation",
    joinDate: "2024-02-15"
  }
];

const Leaderboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Mission Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Top Contributors</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the developers who are building the world's largest repository of Claude AI solutions through our browser extension
          </p>
        </motion.div>

      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Hall of Fame</h2>
        </div>

        {topContributors.map((contributor, index) => (
          <motion.div
            key={contributor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg">
                    {contributor.rank}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-16 h-16 border-4 border-orange-200">
                    <AvatarImage src={contributor.avatar} />
                    <AvatarFallback className="text-xl">{contributor.username[0]}</AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{contributor.username}</h3>
                      {contributor.rank <= 3 && (
                        <Trophy className={`w-5 h-5 ${contributor.rank === 1 ? 'text-yellow-500' : contributor.rank === 2 ? 'text-gray-400' : 'text-orange-600'}`} />
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {contributor.badges.map((badge, badgeIndex) => (
                        <Badge
                          key={badgeIndex}
                          variant="secondary"
                          className={`${
                            badge.includes('Gold') ? 'bg-yellow-100 text-yellow-800' :
                            badge.includes('Silver') ? 'bg-gray-100 text-gray-800' :
                            badge.includes('Bronze') ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      Recent: {contributor.recentActivity}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{contributor.reputation.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Reputation</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{contributor.solutions}</div>
                      <div className="text-xs text-gray-600">Solutions</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Posts</span>
                      </div>
                      <div className="font-semibold text-gray-900">{contributor.posts}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">Votes</span>
                      </div>
                      <div className="font-semibold text-gray-900">{contributor.votes.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Code className="w-4 h-4" />
                        <span className="text-sm">Solutions</span>
                      </div>
                      <div className="font-semibold text-gray-900">{contributor.solutions}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Member Since</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {new Date(contributor.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <Card className="bg-gradient-to-r from-orange-500 to-blue-600 text-white p-8">
          <h3 className="text-2xl font-bold mb-4">Install Our Extension</h3>
          <p className="text-lg mb-6 opacity-90">
            Get the browser extension and start sharing your Claude solutions instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Share Your First Solution
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              Browse Solutions
            </button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;
