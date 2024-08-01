import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();

        // Search product all products either by name or empty string
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        });

        res.json(products);

    } catch (err) {
        res.status(500).json({
            message: "Error retrieving products.",
        })
    }
}

export const createProduct = async (
    req: Request, 
    res: Response
) : Promise<void> => {
    try {
        const {
            name,
            price,
            rating,
            productId,
            stockQuantity
        } = req.body;

        const product = await prisma.products.create({
            data: {
                name,
                price,
                rating,
                productId,
                stockQuantity
            }
        });

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: "Error creating products." });
    }
}