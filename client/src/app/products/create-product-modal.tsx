"use client";

import * as z from "zod";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductMutation } from "@/state/api";

import { PlusCircle } from "lucide-react";

import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormControl,
  } from "@/components/ui/form";
import {
    Dialog,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string(),
    price: z.string(),
    rating: z.string().min(0).max(5),
    stockQuantity: z.string()
});

export const CreateProductModal = ({
    isModalOpen,
    setIsModalOpen
}: {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}) => {
    const [createProduct] = useCreateProductMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: "",
            rating: "",
            stockQuantity: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const newProduct = {
            productId: v4(),
            name: values.name,
            price: parseFloat(values.price),
            rating: parseFloat(values.rating),
            stockQuantity: parseInt(values.stockQuantity)
        }
        await createProduct(newProduct)
    }

    
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusCircle className="size-4 mr-2" />
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the information below to create a new product.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="text"
                                            {...field}
                                            placeholder="Enter product name..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number"
                                            {...field}
                                            min={0}
                                            placeholder="Enter product price..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number"
                                            {...field}
                                            min={0}
                                            max={5}
                                            placeholder="Enter product rating..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stockQuantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock Quantity</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number"
                                            {...field}
                                            min={0}
                                            placeholder="Enter the stock quantity..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}