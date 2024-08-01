"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { setIsSidebarCollapsed } from "@/state";
import { useAppDispatch, useAppSelector } from "@/store/redux";

import {
    Menu,
    User,
    Layout,
    Archive,
    Clipboard,
    PiggyBank,
    LucideIcon,
    SlidersHorizontal,
} from "lucide-react";

import { Logo } from "./logo";
import { Button } from "./ui/button";


type SidebarLinksProps = {
    href: string;
    label: string;
    icon: LucideIcon;
    isCollapsed: boolean;
}

export const SidebarLinks = ({
    href,
    label,
    icon: Icon,
    isCollapsed,
}: SidebarLinksProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link
            href={href}
            className={cn("group flex items-center gap-4 transition-colors duration-200 hover:bg-primary/70",
                isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4",
                isActive ? "bg-primary/70" : "bg-background"
            )}
        >
            <Icon className={cn("size-5 group-hover:text-white", isActive ? "text-white" : "dark:text-zinc-100 text-zinc-900")} />
            <p className={cn("group-hover:text-white",
                isCollapsed ? "hidden" : "block", "transition-colors duration-200 font-medium",
                isActive ? "text-white" : "dark:text-zinc-100 text-zinc-900"
            )}>{label}</p>
        </Link>
    )
}

const sidebarLinks = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: Layout,
    },
    {
        href: "/inventory",
        label: "Inventory",
        icon: Archive,
    },
    {
        href: "/products",
        label: "Products",
        icon: Clipboard,
    },
    {
        href: "/users",
        label: "Users",
        icon: User,
    },
    {
        href: "/settings",
        label: "Settings",
        icon: SlidersHorizontal,
    },
    {
        href: "/expenses",
        label: "Expenses",
        icon: PiggyBank,
    },
]

export const Sidebar = () => {
    const [fill, setFill] = useState("#000000");
    const { resolvedTheme } = useTheme();
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    useEffect(() => {
        const curTheme = resolvedTheme === "dark" ? "#FFFFFF" : "#000000";
        setFill(curTheme);
    }, [resolvedTheme]);

    const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    return (
        <aside className={cn('fixed flex flex-col bg-background transition-all duration-300 overflow-hidden h-full shadow-md z-50', isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64")}>
            <nav className={cn("flex gap-3 justify-between lg:justify-normal items-center pt-8",
                isSidebarCollapsed ? "px-5" : "px-8"
            )}>
                <Logo
                    fill={fill}
                    width={40}
                    height={40}
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="flex md:hidden rounded-full transition-all duration-300"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-4" />
                    <span className="sr-only">Menu</span>
                </Button>
            </nav>
            <nav className="flex-grow mt-8">

                {sidebarLinks.map(({ href, label, icon }, i) => (
                    <SidebarLinks
                        key={i}
                        href={href}
                        label={label}
                        icon={icon}
                        isCollapsed={isSidebarCollapsed}
                    />
                ))}
            </nav>

            <footer className={cn("mt-auto flex items-center w-full justify-center p-6", isSidebarCollapsed ? "hidden" : "block")}>
                <p className="text-center text-xs dark:text-zinc-400 text-zinc-700">
                    &copy; {new Date().getFullYear()} <span className="text-primary font-black">box.</span>
                </p>
            </footer>
        </aside>
    )
}

