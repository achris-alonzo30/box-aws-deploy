"use client";

import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import StoreProvider, { useAppSelector } from "@/store/redux";
import { useTheme } from "next-themes";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    return (
        <main className={cn("flex w-full min-h-screen")}>
            <Sidebar />
            <section className={cn("flex flex-col w-full h-full py-7 px-9",
                isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
            )}>
                <Navbar />
                {children}
            </section>
        </main>
    )
}

export const DashboardWrapper = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <StoreProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </StoreProvider>
    )
}