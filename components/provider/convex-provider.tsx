"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConvexReactClient } from "convex/react";
import { dark } from '@clerk/themes';
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { useTheme } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [actualTheme, setActualTheme] = useState<string | null>(null);
  

  useEffect(() => {
    // Retrieve the theme from localStorage
    const storedTheme = localStorage.getItem('jotion-theme');
    setActualTheme(storedTheme || 'system'); // Fallback to 'system' if no theme is stored
    setTheme(storedTheme || 'system');
  }, [setTheme]);
  

  return (
    <ClerkProvider
      appearance={{
        baseTheme: actualTheme === 'dark' ? dark : undefined, // Apply dark theme or default
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
