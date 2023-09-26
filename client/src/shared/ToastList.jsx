import { useRef, useEffect } from "react";
//Components
import Toast from "./Toast";

export default function ToastList({ data, position, removeToast }) {
  const listRef = useRef(null);

  return (
    data.length > 0 && (
      <ul className={`toast-list ${position}`} aria-live="assertive">
        {data.map((toast) => (
          <Toast
            altText={toast.altText}
            key={toast.id}
            message={toast.message}
            type={toast.type}
            handleClose={() => removeToast(toast.id)}
          />
        ))}
      </ul>
    )
  );
}
