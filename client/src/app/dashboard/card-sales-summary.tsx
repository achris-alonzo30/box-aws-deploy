
import { useState } from "react";
import { useGetDashboardQuery } from "@/state/api";

import {
    Loader2,
    TrendingDown,
    TrendingUp,
    TriangleAlert
} from "lucide-react";

import {
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import {
    Select,
    SelectItem,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const CardSalesSummary = () => {
    const { data, isLoading, isError } = useGetDashboardQuery();
    const salesData = data?.salesSummary || [];

    const [timeframe, setTimeframe] = useState("weekly");

    const totalValueSum = salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

    const avgChangePerc = salesData.reduce((acc, curr, _, array) => {
        return acc + curr.changePercentage! / array.length
    }, 0) || 0;

    const highestValueData = salesData.reduce((acc, curr) => {
        return acc.totalValue > curr.totalValue ? acc : curr;
    }, salesData[0] || {});

    const highestValueDate = highestValueData.date ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
    }) :
        "N/A";

    if (isError) return (
        <span className="flex items-center gap-2"><TriangleAlert className="size-5" /> Failed to load</span>
    );

    return (
        <article className="row-span-3 xl:row-span-6 shadow-md rounded-2xl flex flex-col justify-between">
            {isLoading ? (
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
            ) : (
                <>
                    <header>
                        <h2 className="card-header">Sales Summary</h2>
                        <hr className="divider" />
                    </header>
                    <aside className="overflow-auto">
                        <div className="flex justify-between items-center mb-6 px-7 mt-5">
                            <hgroup className="text-lg font-medium">
                                <p className="text-xs">
                                    Total Value
                                </p>
                                <span className="text-2xl font-black">
                                    ${(totalValueSum / 1000000).toLocaleString("en", {
                                        maximumFractionDigits: 2,
                                    })}m
                                </span>
                                <span className={cn("text-sm ml-2",
                                    avgChangePerc >= 0 ? "text-emerald-500" : "text-rose-500"
                                )}>
                                    {avgChangePerc >= 0 ? (
                                        <TrendingUp className="inline size-4 mr-1" />
                                    ) : (
                                        <TrendingDown className="inline size-4 mr-1" />
                                    )}
                                    {avgChangePerc.toFixed(2)}%
                                </span>
                            </hgroup>
                            <Select
                                value={timeframe}
                                onValueChange={(value) => setTimeframe(value)}
                            >
                                <SelectTrigger className="w-auto">
                                    <SelectValue placeholder="Select a timeframe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <ResponsiveContainer width="100%" height={350} className="px-7">
                            <BarChart
                                data={salesData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: -25,
                                    bottom: 0
                                }}
                            >
                                <CartesianGrid strokeDasharray="" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(val) => {
                                        const date = new Date(val);
                                        return `${date.getMonth() + 1}/${date.getDate()}`
                                    }}
                                />

                                <YAxis
                                    tickFormatter={(value) => {
                                        return `$${(value / 1000000).toFixed(0)}m`;
                                    }}
                                    tick={{ fontSize: 12, dx: -1 }}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <Tooltip
                                    formatter={(value: number) => [
                                        `$${value.toLocaleString("en")}`,
                                    ]}
                                    labelFormatter={(label) => {
                                        const date = new Date(label);
                                        return date.toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        });
                                    }}
                                />
                                <Bar
                                    dataKey="totalValue"
                                    fill="#7c3aed"
                                    barSize={10}
                                    radius={[10, 10, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </aside>
                    <footer>
                        <hr className="divider" />
                        <nav className="flex justify-between items-center mt-6 text-sm px-7 mb-4 text-muted-foreground">
                            <p className="text-sm">{salesData.length || 0} days</p>
                            <p className="text-sm">
                                Highest Sales Data:{" "}
                                <span className="font-bold">{highestValueDate}</span>
                            </p>
                        </nav>
                    </footer>
                </>
            )}
        </article>
    )
}