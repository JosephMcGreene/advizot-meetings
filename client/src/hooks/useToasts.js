import { useState } from "react";

export default function useToasts() {
  const [toasts, setToasts] = useState([]);

  /**
   * contains the logic for when to mount a toast component to the DOM and remove it after
   *
   * @param {string} type    enum "success", "warning", or "failure" determines the icon to display
   * @param {string} message The message for the toast to display
   */
  function showToast(type, message) {
    const toast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
  }

  /**
   * contains the logic for determining how to remove a toast from the DOM
   * @param {string} id ID used for determining which toast to remove if there are multiple mounted toast components
   */
  function removeToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  return { toasts, showToast, removeToast };
}
