"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils/tailwind.utils";

const TabsCompo = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn(
      "w-full inline-flex items-center bg-white text-neutral-400 shadow-inner shadow-neutral-200 overflow-y-hidden scrollbar-hide",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      "relative whitespace-nowrap px-5 text-lg font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-neutral-900 group",
      className,
    )}
    ref={ref}
    {...props}
  >
    <div className="py-2 border-b-2 border-transparent group-data-[state=active]:border-black">
      {props.children}
    </div>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const Tabs = Object.assign(TabsCompo, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export default Tabs;
