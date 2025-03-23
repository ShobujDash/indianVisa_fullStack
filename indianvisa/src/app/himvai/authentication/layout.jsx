"use client";

import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/components/not-found/NotFound";
import { ModeToggle } from "@/components/theme-mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Simple Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full border-t-4 border-blue-500 border-8 w-16 h-16"></div>
  </div>
);

export default function HimVaiLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Simulate loading state if user data is still being fetched or checked
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false); // Set loading to false once the user is determined
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />; // Show the loading spinner if still loading
  }

  if (!user?.isAdmin) {
    return <NotFound />; // Redirect to NotFound if user is not an admin
  }

  return (
    <>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Admin Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="mr-5">
                <ModeToggle />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-2">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </NextThemesProvider>
    </>
  );
}
