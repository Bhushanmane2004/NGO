"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useState } from "react";
import DarkMode from "./dark-mode";
import { AppSidebar } from "./app-sidebar";

export default function DashBooard() {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  console.log(selectedMenu);
  return (
    <div className="flex w-[100vw] h-screen">
      <div>
        <SidebarProvider>
          <AppSidebar onMenuClick={setSelectedMenu} />
          <SidebarTrigger />
        </SidebarProvider>
      </div>

      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-50">
          <DarkMode />
        </div>

        <div className="w-full h-full flex justify-center pt-10">
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h2 className="text-2xl font-bold text-center">{selectedMenu}</h2>

            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50"></div>
              <div className="aspect-video rounded-xl bg-muted/50"></div>
              <div className="aspect-video rounded-xl bg-muted/50"></div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
