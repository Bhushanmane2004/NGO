"use client";

import usescrolltop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/ui/mode-toogle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

function navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = usescrolltop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-3",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Join FoodShare</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/Dashboard">Enter FoodShare</Link>
            </Button>
            <UserButton afterSwitchSessionUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default navbar;
