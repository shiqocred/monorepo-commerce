"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible";
import { Suspense, useState } from "react";

interface NavValueProps {
  title: string;
  url: string;
  icon: LucideIcon;
  items: {
    title: string;
    url: string;
  }[];
}

export function NavMain({
  nav,
}: Readonly<{
  nav: NavValueProps[];
}>) {
  const pathname = usePathname();

  const [openKey, setOpenKey] = useState<string | null>(() => {
    const active = nav.find((item) =>
      item.items?.some((subItem) => pathname.includes(subItem.url)),
    );

    return active ? active.title : "Dashboard";
  });

  return (
    <SidebarContent>
      <SidebarGroup>
        <Suspense
          fallback={
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuSkeleton key={item.title} />
              ))}
            </SidebarMenu>
          }
        >
          <SidebarMenu>
            {nav.map((item) => {
              const isActive = pathname.includes(item.url);

              if (item.items.length === 0) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  key={item.title}
                  open={openKey === item.title}
                  onOpenChange={(open) => setOpenKey(open ? item.title : null)}
                  render={
                    <SidebarMenuItem className="group">
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        }
                      />

                      <CollapsibleTrigger
                        render={
                          <SidebarMenuAction className="group-data-open:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        }
                      />

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isActive={pathname.includes(subItem.url)}
                                render={
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                }
                              />
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  }
                />
              );
            })}
          </SidebarMenu>
        </Suspense>
      </SidebarGroup>
    </SidebarContent>
  );
}
