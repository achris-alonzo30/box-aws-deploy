import { formatNumber } from "@/lib/utils";
import { useGetDashboardQuery } from "@/state/api";
import { ExpenseByCategorySummary } from "@/state/types";
import { Loader2, TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type ExpenseSums = {
    [category: string]: number
}

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

export const CardExpenseSummary = () => {
    const { data, isLoading } = useGetDashboardQuery();

    const expenseSummary = data?.expenseSummary[0];

    const expenseByCategorySummary = data?.expenseByCategorySummary || [];

    const expenseSums = expenseByCategorySummary.reduce((acc: ExpenseSums, item: ExpenseByCategorySummary) => {
        const category = item.category + " Expenses";
        const amount = parseInt(item.amount, 10);

        if (!acc[category]) acc[category] = 0;
        acc[category] += amount;
        return acc;
    }, {});

    const expenseCategories = Object.entries(expenseSums).map(([name, value]) => ({
        name,
        value
    }));

    const totalExpenses = expenseCategories.reduce((acc, category: { value: number }) => acc + category.value, 0);

    const formattedTotalExpenses = totalExpenses.toFixed(2);


    return (
        <article className="row-span-3 shadow-md rounded-2xl flex flex-col justify-between">
            {isLoading ? (
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
            ) : (
                <>
                    <header>
                        <h2 className="card-header">Expense Summary</h2>
                        <hr className="divider" />
                    </header>
                    <aside className="xl:flex justify-between pr-7 overflow-auto">
                        <div className="relative basis-3/5">
                            <ResponsiveContainer width="100%" height={140} className="p-2">
                                <PieChart>
                                    <Pie
                                        cx="50%"
                                        cy="50%"
                                        fill="#7c3aed"
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={50}
                                        outerRadius={60}
                                        data={expenseCategories}
                                    >
                                        {expenseCategories.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index % colors.length]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                                <span className="font-bold text-xl">
                                    ${formattedTotalExpenses}
                                </span>
                            </div>
                        </div>

                        <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                            {expenseCategories.map((entry, index) => (
                                <li
                                    key={`legend-${index}`}
                                    className="flex items-center text-sm"
                                >
                                    <span
                                        className="mr-2 size-3 rounded-full"
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    />
                                    <p>{entry.name}</p>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <footer>
                        <hr className="divider" />
                        {expenseSummary && (
                            <nav className="mt-3 flex justify-between items-center px-7 mb-4">
                                <ul className="pt-2">
                                    <p className="text-sm">
                                        Average:{" "}
                                        <span className="font-semibold">
                                            ${formatNumber(expenseSummary.totalExpenses)}
                                        </span>
                                    </p>
                                </ul>
                                <span className="flex items-center">
                                    <TrendingUp className="size-5 mr-2" />
                                    30%
                                </span>
                            </nav>
                        )}
                    </footer>
                </>
            )}
        </article>
    )
}