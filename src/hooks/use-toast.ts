
// This file reexports the toast hook from the ui/toast component for compatibility
import { toast } from "@/components/ui/toast";
import {
  type ToastActionElement,
  type ToastProps,
} from "@/components/ui/toast";

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const useToast = () => {
  return {
    toast,
    dismiss: toast.dismiss,
  };
};

export { toast, useToast };
export type { ToastProps } from "@/components/ui/toast";
