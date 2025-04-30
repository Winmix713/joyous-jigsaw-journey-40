
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Users, FileText, BarChart2, Cog, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  exact?: boolean;
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      icon: <Home className="h-4 w-4" />,
      label: "Főoldal",
      href: "/",
      exact: true
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Csapatok",
      href: "/teams"
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Mérkőzések",
      href: "/matches"
    },
    {
      icon: <BarChart2 className="h-4 w-4" />,
      label: "Statisztika",
      href: "/statistics"
    },
    {
      icon: <Cog className="h-4 w-4" />,
      label: "Rendszer",
      href: "/system"
    }
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo és cím */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <div className="h-7 w-7 rounded-lg bg-[#161b20] flex items-center justify-center">
                <Home className="h-4 w-4 text-blue-400" />
              </div>
            </div>
            <span className="text-lg font-semibold text-white">
              Win<span className="text-blue-400">Mix</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="bg-[#161b20] border border-[#262b30] rounded-md flex items-center justify-center">
              <nav className="flex h-[35px]">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "h-full px-4 flex items-center justify-center gap-2 transition-colors",
                      isActive(item.href, item.exact)
                        ? "bg-[#0f1a2b] text-[#5d9ff3] border-[#1c3968] font-bold"
                        : "text-white hover:text-[#5d9ff3] hover:bg-[#0f1a2b]"
                    )}
                  >
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-200 bg-[#161b20]/70 border border-[#262b30] rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 mt-2 bg-[#161b20]/95 backdrop-blur-md border border-[#262b30] rounded-md mx-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive(item.href, item.exact)
                    ? "bg-[#0f1a2b] text-[#5d9ff3]"
                    : "text-gray-300 hover:text-[#5d9ff3] hover:bg-[#0f1a2b]/50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
