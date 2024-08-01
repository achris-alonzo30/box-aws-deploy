import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";


type StatDetails = {
    title: string;
    amount: string;
    changePercentage: number;
    IconComponent: LucideIcon;
}

type StatCardProps = {
    title: string;
    primaryIcon: JSX.Element;
    details: StatDetails[];
    dateRange: string;
}
export const StatCard = ({
    title,
    details,
    dateRange,
    primaryIcon,
}: StatCardProps) => {
    const formatPercentage = (value: number) => {
        const signal = value >= 0 ? "+" : "";
        return `${signal}${value.toFixed()}%`
    };

    const getChangeColor = (value: number) => value >= 0 ? "text-emerald-500" : "text-rose-500";


    return (
        <article className="flex flex-col justify-between col-span-1 md:row-span-1 xl:row-span-2 rounded-2xl shadow-md ">
            <header className="overflow-auto">
                <nav className="flex justify-between items-center mb-2 px-5 pt-4">
                    <h2 className="card-header">{title}</h2>
                    <span className="text-xs text-muted-foreground">{dateRange}</span>
                </nav>
                <hr className="divider" />
            </header>

            <aside className="flex mb-6 items-center justify-around gap-4 px-5">
                <div className="rounded-full p-5 border-[1px] bg-primary/70 border-primary">
                    {primaryIcon}
                </div>
                <div className="flex-1">
                    {details.map((detail, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center my-4">
                                <p className="text-muted-foreground">{detail.title}</p>
                                <p className="font-bold">{detail.amount}</p>
                                <div className="flex items-center">
                                    <detail.IconComponent
                                        className={cn("size-4 mr-1",
                                            getChangeColor(detail.changePercentage)
                                        )}
                                    />

                                    <span className={cn("font-medium",
                                        getChangeColor(detail.changePercentage)
                                    )}>
                                        {formatPercentage(detail.changePercentage)}
                                    </span>
                                </div>
                            </div>
                            {index < details.length - 1 && <hr className="divider" />}
                        </div>
                    ))}
                </div>
            </aside>
        </article>
    )
}