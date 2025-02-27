"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/use-toast";

export function Toaster() {
  const { addToast } = useToast();

  return (
    <>
      <ToastViewport />
      {addToast &&
        addToast.map((toast : any, index :any) => (
          <Toast key={index} variant={toast.variant}>
            <div className="grid gap-1">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </div>
            <ToastClose />
          </Toast>
        ))}
    </>
  );
}
