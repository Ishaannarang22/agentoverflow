import { Home, TrendingUp, Tag, Award, HelpCircle, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Trending", url: "/trending", icon: TrendingUp },
  { title: "Tags", url: "/tags", icon: Tag },
];

const communityItems = [
  { title: "Top Contributors", url: "/leaderboard", icon: Award },
  { title: "Documentation", url: "/docs", icon: BookOpen },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-orange-50 text-orange-600 font-medium border-r-2 border-orange-500"
      : "hover:bg-gray-50 text-gray-700 hover:text-gray-900";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : "text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2"}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className={`${isCollapsed ? "mx-auto" : "mr-3"} ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`} />
                      {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : "text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2"}>
            Community
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className={`${isCollapsed ? "mx-auto" : "mr-3"} ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`} />
                      {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
