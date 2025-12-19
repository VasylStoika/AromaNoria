import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  
  // Собираем имя класса варианта: ui-badge-default, ui-badge-secondary и т.д.
  const variantClass = `ui-badge-${variant}`;

  return (
    <Comp
      data-slot="badge"
      className={cn("ui-badge", variantClass, className)}
      {...props}
    />
  );
}

export { Badge };