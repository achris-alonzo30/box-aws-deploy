"use client";

import { notFound } from "next/navigation";
import { useGetUsersQuery } from "@/state/api";

import { userColumns } from "./user-columns";
import { Heading } from "@/components/heading";
import { DataTable } from "@/components/data-table";


const UsersPage = () => {
    const { data, isError, isLoading } = useGetUsersQuery();

    // TODO: Create Loading page
    if (isLoading) return <p>Loading...</p>;

    // TODO: Create Error page
    if (isError || !data) return notFound();
    
    console.log(data)
    return (
        <section className="flex flex-col">
            <Heading name="Inventory" />
            <DataTable 
                filter="name"
                data={data} 
                columns={userColumns}/>
        </section>
    )
}

export default UsersPage;