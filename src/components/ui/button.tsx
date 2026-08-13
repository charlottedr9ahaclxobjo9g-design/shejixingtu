import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--purple)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--purple)] text-white hover:opacity-90 rounded-full",
        secondary: "bg-[var(--orange)] text-white hover:opacity-90 rounded-full",
        dark: "bg-[var(--ink)] text-white hover:opacity-90 rounded-full",
        light: "border border-[var(--line)] bg-white text-[var(--ink)] hover:bg-[var(--panel)] rounded-full",
        outline: "border border-[var(--purple)] text-[var(--purple)] hover:bg-[var(--purple-soft)] rounded-full",
        ghost: "hover:bg-[var(--purple-soft)] text-[var(--purple)] rounded-md",
        link: "text-[var(--purple)] underline-offset-4 hover:underline rounded-full",
      },
      size: {
        default: "min-h-[42px] px-4 rounded-full",
        sm: "min-h-[34px] px-3 rounded-full",
        lg: "min-h-[46px] px-6 rounded-full",
        icon: "h-10 w-10 rounded-full",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
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
