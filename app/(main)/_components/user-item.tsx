"use client";
import { UserButton, useUser } from "@clerk/clerk-react";
import { ChevronsLeftRight } from "lucide-react";
import React from "react";

function UserItem() {
  const { user } = useUser();

  // Handle clicks for opening the user menu
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const userButtonElement = document.querySelector("[data-user-button]") as HTMLButtonElement;
    if (userButtonElement) {
      userButtonElement.click(); // Programmatically trigger the UserButton
    }
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      className="flex items-center text-sm p-3 w-full hover:bg-primary/5 cursor-pointer"
    >
      <div className="gap-x-2 flex items-center max-w-[150px] z-[999999]">
        {/* UserButton is hidden but accessible */}
        <UserButton afterSwitchSessionUrl="/" data-user-button />

        {/* Logo, name, and dropdown icon */}
        <div className="flex items-center gap-x-2">
          <span className="font-medium line-clamp-1">{user?.fullName}&apos;s Jotion</span>
        </div>
      </div>
      {/* Dropdown icon */}
      <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
    </div>
  );
}

export default UserItem;
