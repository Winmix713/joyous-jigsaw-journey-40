
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Context for sidebar state
interface SidebarContextProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps>({
  expanded: true,
  setExpanded: () => undefined,
});

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Provider component
export function SidebarProvider({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState<boolean>(defaultExpanded);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Main sidebar component
export function Sidebar({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-background transition-all duration-300 data-[expanded=true]:w-64 data-[expanded=false]:w-14",
        "print:hidden"
      )}
      data-expanded={expanded}
    >
      {children}
    </aside>
  );
}

// Sidebar header
export function SidebarHeader({ children }: { children?: React.ReactNode }) {
  const { expanded } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-14 items-center border-b px-4",
        expanded ? "justify-between" : "justify-center"
      )}
    >
      {children}
    </div>
  );
}

// Sidebar content (scrollable area)
export function SidebarContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-2 space-y-2">{children}</div>
    </div>
  );
}

// Sidebar group
export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

// Sidebar group label
export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar();
  
  if (!expanded) return null;
  
  return (
    <div className="px-2 py-1.5">
      <span className="text-xs font-medium text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

// Sidebar group content
export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

// Sidebar menu
export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav>{children}</nav>;
}

// Sidebar menu item
export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Sidebar menu button variants
const sidebarMenuButtonVariants = cva(
  "flex items-center gap-2 w-full rounded-md p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        ghost: "hover:bg-transparent hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Sidebar menu button
export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, variant, asChild = false, ...props }, ref) => {
  const { expanded } = useSidebar();
  const Comp = asChild ? React.Fragment : "button";
  const childProps = asChild ? props.children?.props : props;
  
  // Fixed Component
  return (
    <Comp
      ref={ref}
      className={cn(
        sidebarMenuButtonVariants({ variant, className }),
        !expanded && "justify-center"
      )}
      {...childProps}
    >
      {asChild ? (
        React.cloneElement(
          props.children as React.ReactElement,
          {
            className: cn(
              "flex items-center gap-2 w-full",
              !expanded && "justify-center"
            ),
          },
          <>
            {(props.children as React.ReactElement).props.children}
            {!expanded && (props.children as React.ReactElement).props.children[1]}
          </>
        )
      ) : (
        props.children
      )}
    </Comp>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

// Sidebar footer
export function SidebarFooter({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar();
  
  return (
    <div
      className={cn(
        "flex items-center border-t p-4",
        expanded ? "justify-between" : "justify-center"
      )}
    >
      {children}
    </div>
  );
}

// Sidebar trigger (hamburger button)
export function SidebarTrigger() {
  const { expanded, setExpanded } = useSidebar();
  
  return (
    <button
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={() => setExpanded(!expanded)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}
