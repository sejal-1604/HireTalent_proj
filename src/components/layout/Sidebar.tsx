
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, User, File, Mail, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItemProps = {
  to: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
};

const NavItem = ({ to, label, icon: Icon, isActive }: NavItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link 
          to={to} 
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-md transition-all", 
            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
          )}
        >
          <Icon size={18} />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navigation = [
    { to: "/dashboard", label: "Dashboard", icon: CheckCheck },
    { to: "/jobs", label: "Jobs", icon: File },
    { to: "/candidates", label: "Candidates", icon: User },
    { to: "/interviews", label: "Interviews", icon: Calendar },
    { to: "/messages", label: "Messages", icon: Mail },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-6 py-4">
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="font-bold text-white">HT</span>
          </div>
          <span className="font-bold text-xl text-white">HireTalent</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <NavItem 
                  key={item.to} 
                  to={item.to} 
                  label={item.label} 
                  icon={item.icon} 
                  isActive={currentPath === item.to} 
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-2">
              <Button className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-white">
                <File size={16} className="mr-2" />
                Create Job
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="font-medium text-white">JS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">John Smith</span>
              <span className="text-xs text-sidebar-foreground/70">HR Manager</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
