import numeral from "numeral";
import { cn } from "@/lib/utils";
import { useGetDashboardQuery } from "@/state/api";

import {
    Loader2,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    ResponsiveContainer,
} from "recharts";


export const CardPurchaseSummary = () => {
    const { data, isLoading } = useGetDashboardQuery();
    const purchaseData = data?.purchaseSummary || [];
    const lastDataPoint = purchaseData[purchaseData.length - 1] || 0;

    return (
        <article className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 shadow-md rounded-2xl">
            {isLoading ? (
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
            ) : (
                <>
                    <h2 className="card-header">Purchase Summary</h2>
                    <hr className="divider" />

                    <aside className="overflow-auto">
                        <hgroup className="mb-4 mt-7 px-7">
                            <p className="text-xs">Purchased</p>
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">
                                    {lastDataPoint ?
                                        numeral(lastDataPoint.totalPurchased).format("$0.00a") :
                                        "0"}
                                </p>
                                {lastDataPoint && (
                                    <p className={cn("text-sm flex ml-3",
                                        lastDataPoint.changePercentage! >= 0 ?
                                            "text-emerald-500" :
                                            "text-rose-500"
                                    )}>
                                        {lastDataPoint.changePercentage! >= 0 ? (
                                            <TrendingUp className="inline size-4 mr-1" />
                                        ) : (
                                            <TrendingDown className="inline size-4 mr-1" />
                                        )}
                                        {Math.abs(lastDataPoint.changePercentage!).toFixed(2)}%
                                    </p>
                                )}
                            </div>
                        </hgroup>
                        <ResponsiveContainer width="100%" height={200} className="p-2">
                            <AreaChart
                                data={purchaseData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: -50,
                                    bottom: 45
                                }}
                            >
                                <XAxis
                                    dataKey="date"
                                    tick={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    tick={false}
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
                                            day: "numeric"
                                        });
                                    }}
                                />
                                <Area
                                    type="linear"
                                    dataKey="totalPurchased"
                                    fill="#7c3aed"
                                    stroke="#7c3aed"
                                    dot={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </aside>
                </>
            )}
        </article>
    )
}