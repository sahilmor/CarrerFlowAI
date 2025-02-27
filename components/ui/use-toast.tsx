"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// 🔹 Toast Context for Global Access
const ToastContext = React.createContext<{ addToast: (options: ToastOptions) => void } | undefined>(
  undefined
);

// 🔹 Custom Hook to Use Toast
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// 🔹 Toast Provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastOptions[]>([]);

  const addToast = (toast: ToastOptions) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000); // Auto-dismiss after 3s
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastPrimitives.Provider>
        {children}
        <ToastViewport />
        {toasts.map((toast, index) => (
          <Toast key={index} variant={toast.variant}>
            <div className="flex flex-col">
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </div>
            <ToastClose />
          </Toast>
        ))}
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
}

// 🔹 Toast Types
type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

// 🔹 Toast Components
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, variant, children, ...props }, ref) => (
  <ToastPrimitives.Root ref={ref} className={cn("border bg-white text-black p-4", className)} {...props}>
    {children}
  </ToastPrimitives.Root>
));
Toast.displayName = "Toast";

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close ref={ref} className={cn("absolute right-2 top-2", className)} {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-lg font-bold", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm text-gray-600", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn("fixed bottom-4 right-4 flex flex-col space-y-2", className)}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

// 🔹 Export Only Once to Avoid Errors
export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
};
