"use client";

import { cn } from "@/lib/utils";
import { PlateElement, withRef } from "platejs/react";

export const DivElement = withRef<typeof PlateElement>(
    ({ className, children, ...props }, ref) => {
        return (
            <PlateElement
                ref={ref}
                as="div"
                className={cn("my-1", className)}
                {...props}
            >
                {children}
            </PlateElement>
        );
    },
);
