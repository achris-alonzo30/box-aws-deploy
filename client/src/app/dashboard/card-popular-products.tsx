
import { Rating } from "@/components/rating";
import { Button } from "@/components/ui/button";
import { useGetDashboardQuery } from "@/state/api";

import { Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const CardPopularProducts = () => {
    const { data: dashboard, isLoading } = useGetDashboardQuery();

    return (
        <article className="row-span-3 xl:row-span-6 shadow-md rounded-2xl pb-16">
            {isLoading ? (
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
            ) : (
                <>
                    <header>
                        <h2 className="card-header">Popular Products</h2>
                        <hr className="divider" />
                    </header>
                    <aside className="overflow-auto h-full">
                        {dashboard?.popularProducts.map((product) => (
                            <div
                                key={product.productId}
                                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                            >
                                <div className="flex items-center gap-3">
                                    <Image
                                        width={50}
                                        height={50}
                                        alt={product.name}
                                        className="rounded-lg size-14 shadow-md"
                                        src={`https://s3-bucket-box.s3.ca-central-1.amazonaws.com/Product%20${Math.floor(Math.random() * 3) + 1}.png`}
                                    />
                                    <div className="flex flex-col justify-between gap-1">
                                        <hgroup className="font-bold text-gray-700">

                                        </hgroup>
                                        <hgroup className="flex text-sm items-center">
                                            <span className="font-bold text-blue-500 text-xs">
                                                ${product.price}
                                            </span>
                                            <span className="mx-2">|</span>
                                            <Rating rating={product.rating || 0} />
                                        </hgroup>
                                    </div>
                                </div>
                                <hgroup className="text-xs flex items-center">
                                    <Button type="button" size="icon" className="rounded-full bg-primary/70">
                                        <ShoppingBag className="size-4" />
                                        <span className="sr-only">Shopping Bag</span>
                                    </Button>
                                    <span className="ml-2">{Math.round(product.stockQuantity / 1000)}k sold</span>
                                </hgroup>
                            </div>
                        ))}
                    </aside>
                </>
            )}
        </article>
    )
}