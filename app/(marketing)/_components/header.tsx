"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Header() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className="max-w-3xl space-y-6 text-center mx-auto py-10">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
        Connecting Surplus Food with Those in Need. <br />
        Welcome to{" "}
        <span className="underline text-green-600 dark:text-green-400">
          FoodShare
        </span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium text-muted-foreground">
        Join our mission to reduce food waste and feed communities. <br /> Every
        meal shared is a story of hope.
      </h3>
      <Button asChild size="lg" className="gap-2">
        <Link href="/signup">
          Join FoodShare Now <ArrowRight className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}

export default Header;
