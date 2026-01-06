"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
        {process.env.NODE_ENV === "development" && <Devtools />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function Devtools() {
  const DevtoolsComponent =
    require("@tanstack/react-query-devtools").ReactQueryDevtools;

  return <DevtoolsComponent initialIsOpen={false} />;
}
