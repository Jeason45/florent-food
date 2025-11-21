import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--terracotta)] text-white",
        secondary: "border-transparent bg-[var(--creme)] text-[var(--noir-elegant)]",
        outline: "border-[var(--terracotta)] text-[var(--terracotta)]",
        success: "border-transparent bg-[var(--success)] text-white",
        warning: "border-transparent bg-[var(--warning)] text-white",
        error: "border-transparent bg-[var(--error)] text-white",
        premium:
          "border-transparent bg-gradient-to-r from-[var(--or-accent)] to-[var(--or-light)] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
