import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Trending from "./pages/Trending";
import Tags from "./pages/Tags";
import PostDetail from "./pages/PostDetail";
import SubmitPost from "./pages/SubmitPost";
import UserProfile from "./pages/UserProfile";
import Leaderboard from "./pages/Leaderboard";
import Documentation from "./pages/Documentation";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/submit" element={<SubmitPost />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/:id" element={<UserProfile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/docs" element={<Documentation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
