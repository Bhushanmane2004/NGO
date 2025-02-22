"use client";

import {
  BellPlus,
  Calendar,
  DollarSign,
  EarthLock,
  Group,
  Home,
  Laptop,
  Map,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const defaultItems = [
  { title: "Home", url: "#", icon: Home },
  { title: "Donate Food", url: "#", icon: Home },
  { title: "NGO Near Me", url: "#", icon: Map },
  { title: "Donations", url: "#", icon: DollarSign },
];

export function AppSidebar({
  onMenuClick,
}: {
  onMenuClick: (title: string) => void;
}) {
  const { user } = useUser();
  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    if (user?.publicMetadata?.role === "NGO") {
      setItems((prevItems) => {
        if (!prevItems.find((item) => item.title === "Request for Food")) {
          console.log("User is an NGO, adding Admin menu");
          return [
            ...prevItems,
            { title: "Request for Food", url: "#", icon: EarthLock },
          ];
        }
        return prevItems;
      });
    }
  }, [user?.publicMetadata?.role]);

  return (
    <Sidebar className="flex flex-col h-full">
      {/* User button at top */}
      <div className="p-4">
        <UserButton afterSignOutUrl="/" />
      </div>

      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Error 404 </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex-grow m-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => onMenuClick(item.title)}
                      className="flex items-center gap-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarContent>
        <SidebarMenuButton asChild>
          <button
            onClick={() => onMenuClick("Settings")}
            className="flex gap-2 items-center mb-5 mt-auto"
          >
            <Settings />
            <span>Settings</span>
          </button>
        </SidebarMenuButton>
      </SidebarContent>
    </Sidebar>
  );
}
