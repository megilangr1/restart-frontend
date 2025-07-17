import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FolderIcon, Home, LucideIcon } from "lucide-react";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

export interface NavList {
  title: string;
  url: string;
  icon: LucideIcon;
  className?: string;
  role?: string[];
  items?: NavChild[];
}

export interface NavChild {
  title: string;
  url: string;
  role?: string[];
}

const navMain: NavList[] = [
  {
    title: "Halaman Utama",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Master Data",
    url: "#",
    icon: FolderIcon,
    role: ["MeGGi", "Administrator"],
    items: [
      {
        title: "Akun Admin",
        url: "/master-data/daftar-admin",
      },
      {
        title: "Jabatan",
        url: "/master-data/daftar-jabatan",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-1.5">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-4"
              >
                <Avatar className="size-14 md:size-14 rounded-lg border">
                  <AvatarImage src="/img/logo.png" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0 flex-auto">
                  <span className="text-sm font-semibold">Web Aplikasi</span>
                  <span className="text-xs font-semibold">
                    Pendataan Penduduk
                  </span>
                  <span className="text-[10px] pt-1">Kota Sukabumi</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr className="w-full border-t-2" />
      <SidebarContent className="gap-0">
        <NavMain items={navMain} title="Navigasi Utama" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "-",
            email: "-",
            avatar: "/img/logo.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
