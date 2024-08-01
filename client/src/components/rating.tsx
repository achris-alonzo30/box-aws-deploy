import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type RatingProps = {
    rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
    return [1, 2, 3, 4, 5].map((index) => (
        <Star 
            key={index}
            className={cn("size-4",
                index <= rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
            )}
        />
    ))
}