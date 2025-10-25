import { PostCard } from "@/components/PostCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers, mockPosts } from "@/data/mockData";
import { Award, MessageSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const UserProfile = () => {
  const user = mockUsers[0];
  const userPosts = mockPosts.filter((post) => post.author.id === user.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
          <Card className="glass-card p-8 mb-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary glow-effect">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.username[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold text-primary">
                    {user.reputation} reputation
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="glass-card p-4 rounded-lg text-center">
                    <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{userPosts.length}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg text-center">
                    <MessageSquare className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {userPosts.reduce((acc, post) => acc + post.comments, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Answers</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg text-center">
                    <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {userPosts.reduce((acc, post) => acc + post.votes, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Votes</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          </div>

          <div className="space-y-4">
            {userPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
    </motion.div>
  );
};

export default UserProfile;
