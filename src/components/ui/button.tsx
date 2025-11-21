import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-dark)] shadow-[0_4px_14px_0_rgba(224,122,95,0.4)] hover:shadow-[0_6px_20px_0_rgba(224,122,95,0.5)] hover:-translate-y-0.5",
        secondary:
          "bg-[var(--creme)] text-[var(--noir-elegant)] hover:bg-[var(--creme-dark)] shadow-sm hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border-2 border-[var(--terracotta)] bg-transparent text-[var(--terracotta)] hover:bg-[var(--terracotta)] hover:text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5",
        ghost: "hover:bg-[var(--creme-light)] hover:text-[var(--noir-elegant)] hover:-translate-y-0.5",
        premium:
          "bg-gradient-to-r from-[var(--terracotta)] via-[var(--or-accent)] to-[var(--or-light)] text-white shadow-[0_8px_20px_0_rgba(212,175,55,0.4)] hover:shadow-[0_12px_30px_0_rgba(212,175,55,0.5)] hover:scale-[1.02] font-bold",
        link: "text-[var(--terracotta)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
