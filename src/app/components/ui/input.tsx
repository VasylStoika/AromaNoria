import * as React from "react";
import { cn } from "./utils";

// Убедитесь, что вы импортировали файл ui.css в своем App.tsx или index.css
// например: import '../../../styles/ui.css'; 

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      // Мы используем "ui-input" как основной класс.
      // Функция cn() позволяет добавить дополнительные классы поверх (className), если нужно.
      className={cn("ui-input", className)}
      {...props}
    />
  );
}

export { Input };