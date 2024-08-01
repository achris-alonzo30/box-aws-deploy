"use client";

import { notFound } from "next/navigation";
import { useGetProductsQuery } from "@/state/api";

import { Heading } from "@/components/heading";
import { DataTable } from "@/components/data-table";
import { inventoryColumns } from "./inventory-columns";

const InventoryPage = () => {
    const { data, isError, isLoading } = useGetProductsQuery();

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
                columns={inventoryColumns}
            />
        </section>
    )
}

export default InventoryPage;