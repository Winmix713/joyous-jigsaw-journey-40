
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react"

type SidebarContextValue = {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}

const Sidebar = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 left-0 h-full z-20 pt-14 bg-sidebar border-r border-sidebar-border shadow-md transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-14",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = forwardRef<
  ElementRef<"button">,
  ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  const { expanded, setExpanded } = useSidebar()

  return (
    <button
      ref={ref}
      className={cn(
        "fixed top-4 left-4 z-40 p-2 rounded-md bg-sidebar border border-sidebar-border shadow-md transition-all duration-300 ease-in-out",
        expanded ? "left-64" : "left-14",
        className
      )}
      onClick={() => setExpanded(!expanded)}
      {...props}
    >
      {expanded ? "←" : "→"}
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col h-full overflow-y-auto p-4",
        expanded ? "items-start" : "items-center",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const sidebarHeaderVariants = cva(
  "flex items-center h-14 px-4 border-b border-sidebar-border transition-all duration-300 ease-in-out",
  {
    variants: {
      expanded: {
        true: "justify-between",
        false: "justify-center",
      },
    },
    defaultVariants: {
      expanded: true,
    },
  }
)

interface SidebarHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarHeaderVariants> {}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, expanded, ...props }, ref) => {
    const { expanded: isExpanded } = useSidebar()

    return (
      <div
        ref={ref}
        className={cn(
          sidebarHeaderVariants({ expanded: isExpanded }),
          className
        )}
        {...props}
      />
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center h-14 px-4 border-t border-sidebar-border transition-all duration-300 ease-in-out mt-auto",
        expanded ? "justify-between" : "justify-center",
        className
      )}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        expanded ? "space-y-1" : "items-center space-y-2",
        className
      )}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { expanded } = useSidebar()

  if (!expanded) {
    return null
  }

  return (
    <span
      ref={ref}
      className={cn(
        "text-xs font-medium text-sidebar-foreground/60 ml-3",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        expanded ? "space-y-1" : "items-center space-y-1",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("list-none", className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "flex items-center gap-2 rounded-md transition-colors duration-200 focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        accent:
          "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90",
        ghost:
          "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-8 px-2 py-1.5 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SidebarMenuButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const { expanded } = useSidebar()
  const Comp = asChild ? "div" : "button"

  return (
    <Comp
      ref={ref}
      className={cn(
        sidebarMenuButtonVariants({ variant, size }),
        expanded ? "w-full" : "w-10 h-10 justify-center",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
}
