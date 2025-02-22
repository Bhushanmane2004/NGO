"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useState } from "react";
import DarkMode from "./dark-mode";
import { AppSidebar } from "./app-sidebar";
import NgoNearMe from "./ngonearme";
import Home from "../(main)/(routes)/(container)/home";

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState("Home");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Home":
        return <Home />;
      case "NGO Near Me":
        return <NgoNearMe />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="h-full">
        <SidebarProvider>
          <AppSidebar onMenuClick={setSelectedMenu} />
          <SidebarTrigger />
        </SidebarProvider>
      </div>

      <main className="flex-1 overflow-auto">
        <div className="relative p-6">
          <div className="absolute top-4 right-4 z-50">
            <DarkMode />
          </div>

          <div className="max-w-[1400px] mx-auto pt-3">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {/* {selectedMenu} */}
            </h2>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
