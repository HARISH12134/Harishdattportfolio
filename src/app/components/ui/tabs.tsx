"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "backdrop-blur-2xl bg-gradient-to-r from-cyan-400/10 to-cyan-500/5 border border-cyan-400/30 text-foreground inline-flex h-auto w-fit items-center justify-center rounded-2xl p-1.5 shadow-lg",
        className,
      )}
      style={{
        boxShadow: '0 8px 32px rgba(0, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "backdrop-blur-xl inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "text-white/70 hover:text-white hover:bg-white/5",
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400/20 data-[state=active]:to-cyan-500/10 data-[state=active]:border-cyan-400/40 data-[state=active]:text-cyan-300 data-[state=active]:shadow-lg",
        "focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:outline-none",
        className,
      )}
      style={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };