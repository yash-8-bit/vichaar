"use client";
import { ChevronLeft, Home, LogOut, Settings, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/components/../utils/cn";
import SidebarItem from "./items";
import { getMe } from "@/services/me.service";
import { useRouter } from "next/navigation";
interface SidebarProps {
  className?: string;
}

const CollapsibleSidebar: React.FC<SidebarProps> = ({ className }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [admin_, setAdmin_] = useState<AdminType | null>(null);
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const menuItems = [
    { icon: Home, label: "Home", active: false, slug: "/panel" },
    { icon: Users, label: "Users", active: false, slug: "/panel/users" },
  ];

  const userActions = [
    { icon: Settings, label: "Settings", active: false, slug: "/settings" },
    { icon: LogOut, label: "Logout", active: false, slug: "/logout" },
  ];

  useEffect(() => {
    (async () => {
      const res = await getMe();
      if (res.success) setAdmin_(res.data as AdminType);
      else router.replace("/");
    })();
  },[]);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-r-[#EBEDEE] bg-[#F5F7F9]",
        isCollapsed ? "w-20" : "w-60",
        className,
      )}
    >
      <div className="relative border-b border-b-[#EBEDEE] px-4 py-3">
        <div className="flex items-center space-x-3">
          <img
            src="https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          
            className="size-6 rounded-full"
          />
          <span
            className={cn(
              "text-lg font-bold text-gray-800 transition-opacity duration-200",
              isCollapsed && "hidden opacity-0",
            )}
          >
            Vichaar
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="absolute top-4 -right-3 cursor-pointer rounded-full border border-[#EBEDEE] bg-white p-1 text-gray-600 hover:bg-[#EBEDEE]"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isCollapsed && "rotate-180",
            )}
          />
        </button>
      </div>

      <nav className="mt-2 flex-1">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <SidebarItem {...item} isCollapsed={isCollapsed} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-t-[#EBEDEE]">
        <div className="flex cursor-pointer items-center px-4 py-3 transition hover:bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face"
            className="size-8 rounded-full"
          />
          <div
            className={cn(
              "ml-3 flex flex-col transition-opacity duration-200",
              isCollapsed && "hidden opacity-0",
            )}
          >
            <span className="text-sm font-medium text-gray-700">
              {admin_?.name}
            </span>
            <span className="text-xs text-gray-500">{admin_?.email}</span>
          </div>
        </div>

        <div className="px-2 pb-2">
          {userActions.map((item, idx) => (
            <SidebarItem key={idx} {...item} isCollapsed={isCollapsed} />
          ))}
        </div>

        
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;
