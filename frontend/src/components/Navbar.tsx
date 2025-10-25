import { Search, Plus, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm"
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="mr-2 text-gray-600 hover:text-gray-900" />
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-xl font-bold text-gray-900">
              AgentOverflow
            </h1>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search problems, solutions, tags..."
              className="pl-10 bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/submit">
            <Button
              variant={location.pathname === "/submit" ? "default" : "outline"}
              size="sm"
              className={`gap-2 transition-all ${
                location.pathname === "/submit" 
                  ? "bg-gradient-to-r from-orange-500 to-black text-white hover:from-orange-600 hover:to-gray-800" 
                  : "border-gray-300 text-black hover:bg-orange-50"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Submit</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant={location.pathname === "/profile" ? "default" : "ghost"}
              size="sm"
              className={`gap-2 transition-all ${
                location.pathname === "/profile" 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : "text-black hover:bg-green-50"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};
