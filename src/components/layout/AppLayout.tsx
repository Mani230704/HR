"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Users, Bookmark, Moon, Sun, Briefcase } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import React from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/employees', label: 'Employees', icon: Users },
  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme(); // Use resolvedTheme for initial rendering
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentTheme = mounted ? theme : 'light'; // Default to light or system if not mounted

  const handleThemeChange = () => {
    if (setTheme) {
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
  };
  
  const displayTheme = mounted ? (resolvedTheme || currentTheme) : 'light';


  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar
          collapsible="icon"
          className="border-r bg-sidebar text-sidebar-foreground hidden md:flex" // Hide on mobile, SidebarTrigger handles mobile
          variant="sidebar" 
        >
          <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Briefcase className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-[15deg]" />
              <h1 className="text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">
                PerformPulse
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      variant="default"
                      className="w-full justify-start"
                      isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                      tooltip={{ children: item.label, side: 'right', className: "bg-primary text-primary-foreground" }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2">
            {mounted && setTheme && ( // Ensure setTheme is available
                 <SidebarMenuButton
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleThemeChange}
                    aria-label="Toggle theme"
                    tooltip={{ children: displayTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', side: 'right', className: "bg-primary text-primary-foreground" }}
                >
                {displayTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="ml-2 group-data-[collapsible=icon]:hidden">
                    {displayTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
                </SidebarMenuButton>
            )}
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 w-full">
           <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b shadow-sm bg-background sm:px-6 md:hidden"> {/* Mobile header */}
            <div className="flex items-center">
              <SidebarTrigger /> {/* Hamburger for mobile to open sidebar */}
            </div>
            <Link href="/" className="flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">PerformPulse</h1>
            </Link>
            {/* Placeholder for potential mobile actions like theme toggle */}
            {mounted && setTheme && (
              <Button variant="ghost" size="icon" onClick={handleThemeChange} aria-label="Toggle theme">
                {displayTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
          </header>
          <SidebarInset className="flex-1 bg-background"> {/* Ensure SidebarInset is used correctly if it's just a div */}
            <main className="flex-1 p-4 overflow-y-auto sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
