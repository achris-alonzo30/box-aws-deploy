"use client";

import Image from "next/image";
import { useState } from "react";
import { notFound } from "next/navigation";
import { useGetProductsQuery } from "@/state/api";

import { SearchIcon } from "lucide-react";

import { Rating } from "@/components/rating";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { CreateProductModal } from "./create-product-modal";

const ProductsPage = () => {
    const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isError, isLoading } = useGetProductsQuery();

    // TODO: Create Skeleton Loading page 
    if (isLoading) return <p>Loading...</p>;

    // TODO: Create Error page
    if (isError || !data) return notFound();

    return (
        <section className="mx-auto pb-5 w-full">
            <aside className="mb-6">
                <fieldset className="flex items-center border-2 border-muted-foreground rounded">
                    <SearchIcon className="size-5 text-muted-foreground m-2" />
                    <Input
                        type="text"
                        value={query}
                        className="w-full"
                        placeholder="Search products..."
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </fieldset>

            </aside>
            <hgroup className="flex justify-between items-center mb-6">
                <Heading name="Popular Products" />
                <CreateProductModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </hgroup>
            <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {data.map((d) => (
                    <div
                        key={d.productId}
                        className="border shadow rounded-md p-4 max-w-full w-full mx-auot"
                    >
                        <hgroup className="flex flex-col items-center">
                            <Image
                                width={150}
                                height={150}
                                alt={d.name}
                                className="rounded-2xl size-36 shadow-md mb-3"
                                src={`s3-bucket-box.s3.ca-central-1.amazonaws.com/product${Math.floor(Math.random() * 3) + 1}.png`}
                            />
                            <h3 className="text-lg font-semibold">{d.name}</h3>
                            <p>{d.price.toFixed(2)}</p>
                            <span className="text-sm text-muted-foreground mt-1">
                                SQ: {d.stockQuantity}
                            </span>
                            {d.rating && (
                                <span className="flex items-center mt-2">
                                    <Rating rating={d.rating} />
                                </span>
                            )}
                        </hgroup>
                    </div>
                ))}
            </aside>
        </section>
    )
}

export default ProductsPage;