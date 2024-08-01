"use client";

import Link from "next/link";
import Image from "next/image";
import { setIsSidebarCollapsed } from "@/state";
import { useAppDispatch, useAppSelector } from "@/store/redux";

import { Bell, Menu, Search, Settings } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";



export const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    return (
        <header className="flex justify-between items-center w-full mb-7">
            {/* Left Side */}
            <nav className="flex justify-between items-center gap-5">
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-4" />
                    <span className="sr-only">Menu</span>
                </Button>

                <nav className="relative">
                    <Input
                        type="search"
                        className="w-50 md:w-60 pl-10"
                        placeholder="Start typing to search..."
                    />
                    <aside className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="text-zinc-500 size-4" />
                        <span className="sr-only">Magnifying Glass</span>
                    </aside>
                </nav>
            </nav>

            {/* Right Side */}
            <nav className="flex justify-between items-center gap-5">
                <aside className="hidden md:flex justify-between items-center gap-5">
                    <div className="">
                        <ThemeToggle />
                    </div>
                    <div className="relative">
                        <Bell className="text-zinc-500 size-5" />
                        <span className="sr-only">Bell Notifications</span>
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.35rem] py-0.5 text-xs font-semibold leading-none text-rose-100 bg-rose-400 rounded-full">
                            3
                        </span>
                    </div>
                    <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="size-9 flex items-center gap-2">
                            <Image 
                                width={50}
                                height={50} 
                                alt="User Profile Picture" 
                                className="rounded-full h-full object-cover"
                                src="https://s3-bucket-box.s3.ca-central-1.amazonaws.com/profile.jpeg"  
                            />
                        </div>
                    </div>
                </aside>
                <Link href="/settings">
                    <Settings className="size-5 cursor-pointer text-zinc-500" />
                    <span className="sr-only">Settings</span>
                </Link>
            </nav>
        </header>
    )
}