"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@repo/ui/components/sidebar";
import {
  ChartNoAxesGantt,
  Gauge,
  PawPrint,
  Percent,
  RocketIcon,
  Settings2,
  ShoppingBag,
  Store,
  Tags,
  UserRound,
} from "lucide-react";
import { NavMain } from "./nav-main";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { useLogout } from "@/app/(auth)/login/_api";
import { Button } from "@repo/ui/components/button";

const data = [
  {
    title: "Dashboard",
    url: "/",
    icon: Gauge,
    items: [],
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingBag,
    items: [
      { title: "List", url: "/orders" },
      { title: "Review", url: "/reviews" },
    ],
  },
  {
    title: "Customers",
    url: "/customers",
    icon: UserRound,
    items: [],
  },
  {
    title: "Products",
    url: "/products",
    icon: ChartNoAxesGantt,
    items: [],
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tags,
    items: [],
  },
  {
    title: "Pets",
    url: "/pets",
    icon: PawPrint,
    items: [],
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: Store,
    items: [],
  },
  {
    title: "Marketing",
    url: "/reports",
    icon: Percent,
    items: [
      { title: "Reports", url: "/reports" },
      { title: "Discounts", url: "/discounts" },
      { title: "Banners", url: "/banners" },
      { title: "Promos", url: "/promos" },
      { title: "Free Shipping", url: "/free-shippings" },
    ],
  },
  {
    title: "Settings",
    url: "/settings/store",
    icon: Settings2,
    items: [],
  },
];

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { open } = useSidebar();
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"}>
          <SidebarMenuButton
            className={cn(
              "h-auto text-xl font-bold justify-start",
              !open && "group-data-[collapsible=icon]:p-0!",
            )}
          >
            <div className="size-8 flex-none flex items-center justify-center rounded-md bg-gray-300">
              <RocketIcon className="size-5" />
            </div>
            <h1>ADMIN</h1>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain nav={data} />
        <Button onClick={handleLogout}>logout</Button>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
