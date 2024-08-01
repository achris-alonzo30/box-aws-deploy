import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    Product,
    SalesSummary,
    ExpenseSummary,
    PurchaseSummary,
    ExpenseByCategorySummary,
    NewProduct,
    User,
} from "./types";



export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!
    }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
    endpoints: (build) => ({
        getDashboard: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
                url: "/products",
                params: search ? { search } : {}
            }),
            providesTags: ["Products"]
        }),
        getUsers: build.query<User[], void>({
            query: () => "/users",
            providesTags: ["Users"]
        }),
        getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
            query: () => "/expenses",
            providesTags: ["Expenses"]
        }),
        createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        })
    })
});

export const { 
    useGetDashboardQuery,
    useGetProductsQuery,
    useGetUsersQuery,
    useGetExpensesByCategoryQuery,
    useCreateProductMutation
} = api;