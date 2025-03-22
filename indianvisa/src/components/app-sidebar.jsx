"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
  LayoutDashboard,
  NotebookPen,
  CreditCard,
} from "lucide-react";

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "IndianVisaApplication",
    email: "indianvisaapplication@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "IndianVisaApplication",
      logo: GalleryVerticalEnd,
      plan: "Admin Pannel",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/himvai/authentication/dashboard",
        },
        {
          title: "Graph",
          url: "#",
        },
      ],
    },
    {
      title: "Accounts",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "User Info",
          url: "/himvai/authentication/user-info",
        },
        {
          title: "Add/Edit Accounts",
          url: "/himvai/authentication/user-info/edit",
        },
      ],
    },
    {
      title: "Applications",
      url: "/applications-info",
      icon: NotebookPen,
      items: [
        {
          title: "All Applications Info",
          url: "/himvai/authentication/applications-info",
        },
        {
          title: "Add/Edit Applications Info",
          url: "/himvai/authentication/applications-info/edit",
        },
      ],
    },
    {
      title: "Payment",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "All Payments",
          url: "/himvai/authentication/payments",
        },
        {
          title: "Add/Edit Payments",
          url: "/himvai/authentication/payments/edit",
        },
      ],
    },
    {
      title: "Add Documetns",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Add Documents",
          url: "/himvai/authentication/add-documents",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
