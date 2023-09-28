import { useRef, useEffect } from "react";
//Components
import Toast from "./Toast";

export default function ToastList({ data, removeToast }) {
  const listRef = useRef(null);

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [data]);

  function handleScrolling(element) {
    element?.scrollTo(0, element.scrollHeight);
  }

  return (
    data.length > 0 && (
      <ul className="toast-list top-left" aria-live="assertive">
        {data.map((toast) => (
          <Toast
            key={toast.id}
            altText={toast.altText}
            message={toast.message}
            type={toast.type}
            handleClose={() => removeToast(toast.id)}
          />
        ))}
      </ul>
    )
  );
}
