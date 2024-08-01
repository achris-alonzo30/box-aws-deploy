"use client";

import { 
    Tag,
    Package,
    TrendingUp,
    CheckCircle,  
    TrendingDown,  
} from "lucide-react";
import { StatCard } from "./stat-card";
import { CardSalesSummary } from "./card-sales-summary";
import { CardExpenseSummary } from "./card-expense-summary";
import { CardPopularProducts } from "./card-popular-products";
import { CardPurchaseSummary } from "./card-purchase-summary";

const Dashboard = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
            <CardPopularProducts />
            <CardSalesSummary />
            <CardPurchaseSummary />
            <CardExpenseSummary />

            {/* TODO: Make this dynamic */}
            <StatCard 
                title="Customer & Expenses"
                dateRange="22 - 29 October 2023"
                primaryIcon={<Package className="text-primary size-6"/>}
                details={[
                    {
                        title: "Customer Growth", 
                        amount: "175.00",
                        changePercentage: 131,
                        IconComponent: TrendingUp
                    },
                    {
                        title: "Expenses", 
                        amount: "10.00",
                        changePercentage: -76,
                        IconComponent: TrendingDown
                    },
                ]}
            />
            <StatCard 
                title="Dues & Pending Orders"
                dateRange="22 - 29 October 2023"
                primaryIcon={<CheckCircle className="text-primary size-6"/>}
                details={[
                    {
                        title: "Dues", 
                        amount: "250.00",
                        changePercentage: 131,
                        IconComponent: TrendingUp
                    },
                    {
                        title: "Pending Orders", 
                        amount: "147.00",
                        changePercentage: -56,
                        IconComponent: TrendingDown
                    },
                ]}
            />
            <StatCard 
                title="Sales & Discount"
                dateRange="22 - 29 October 2023"
                primaryIcon={<Tag className="text-primary size-6"/>}
                details={[
                    {
                        title: "Sales", 
                        amount: "1000.00",
                        changePercentage: 20,
                        IconComponent: TrendingUp
                    },
                    {
                        title: "Discound", 
                        amount: "200.00",
                        changePercentage: -10,
                        IconComponent: TrendingDown
                    },
                ]}
            />
        </section>
    )
}

export default Dashboard;