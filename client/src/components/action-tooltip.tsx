import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "./ui/tooltip";

type ActionTooltipProps = {
    label: string;
    isCollapsed: boolean;
    children: React.ReactNode;
}

export const ActionTooltip = ({
    label,
    children,
    isCollapsed,
}: ActionTooltipProps) => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger  asChild>
                    {children}
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent align="end">
                        {label}
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    )
}