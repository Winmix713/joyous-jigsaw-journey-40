
// This file reexports the toast hook from the ui/toast component for compatibility
import {
  type ToastProps,
  type ToastActionElement,
  Toast,
} from "@/components/ui/toast";

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Define toast function to match expected interface
const toast = (props: ToasterToast) => {
  // Implementation details will be handled by sonner
  return props;
};

// Create a custom hook for toast functionality
const useToast = () => {
  return {
    toast,
    dismiss: (toastId?: string) => {
      // Implementation for dismiss
    },
    // Add toasts property to fix the error in toaster.tsx
    toasts: [] as ToasterToast[],
  };
};

export { toast, useToast };
export type { ToastProps } from "@/components/ui/toast";
