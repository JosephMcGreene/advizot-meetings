import { useState } from "react";
import type { Toast } from "../types/toast.d.ts";

export default function useToasts() {
  const [toasts, setToasts] = useState([]);

  /**
   * contains the logic for determining how to remove a toast from the DOM.
   * @param {string} id Identifier used to determine which toast to remove.
   */
  function removeToast(id: number) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  /**
   * contains the logic for mounting a toast component to the DOM and remove it after a delay.
   * @param {string} type    Enum "success", "warning", or "failure" determines the icon to display.
   * @param {string} message The message for the toast to display.
   */
  function showToast(type: string, message: string) {
    const toast: Toast = {
      id: Date.now(),
      type: type.toLowerCase(),
      message,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
      removeToast(toast.id);
    }, 4000); // Linked to toast animation. If changed, be sure to change animation duration in _toasts.scss to match
  }

  return { toasts, showToast, removeToast };
}
