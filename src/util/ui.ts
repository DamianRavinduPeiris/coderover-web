import toast from "react-hot-toast";

export function showError(message: string) {
  toast.error(message);
}

export function showSuccess(message: string) {
  toast.success(message);
}
