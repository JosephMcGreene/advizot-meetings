import { useRef, useEffect } from "react";
//Components
import Toast from "./Toast";

export default function ToastList({ data, position, removeToast }) {
  const listRef = useRef(null);

  const sortedData = position.includes("bottom")
    ? [...data].reverse()
    : [...data];

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [position, data]);

  function handleScrolling(element) {
    const isTopPosition = ["top-left", "top-right"].includes(position);

    if (isTopPosition) {
      element?.scrollTo(0, element.scrollHeight);
    } else {
      element?.scrollTo(0, 0);
    }
  }

  return (
    sortedData.length > 0 && (
      <ul className={`toast-list ${position}`} aria-live="assertive">
        {sortedData.map((toast) => (
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
