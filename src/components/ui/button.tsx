import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-neutral-800 shadow hover:bg-primary/90",
        green: "",
        red: "",
        yellow: "",
        gradientYellowRed:
          "bg-gradient-to-br from-yellow-500/70 to-orange-500/70 hover:from-orange-500/70 hover:to-yellow-500/70",
        gradientBluePurple:
          "bg-gradient-to-br from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500",
        destructive: "",
        outline: "",
        disabled: "",
        secondary: "bg-secondary shadow hover:bg-secondary/90",
        ghost: "hover:bg-background/10",
        link: "text-primary underline-offset-4 hover:underline !justify-start !px-0",
        primaryOpacity: "bg-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        auto: "",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        xl: "h-12 px-10",
        icon: "h-8 w-8 rounded-full [&_svg]:size-4",
        iconLg: "h-10 w-10 rounded-full",
        iconXl: "h-12 w-12 rounded-full [&_svg]:size-5",
        icon2Xl: "h-14 w-14 rounded-full [&_svg]:size-5",
      },
      rounded: {
        default: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
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
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
