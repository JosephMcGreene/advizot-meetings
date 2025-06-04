import { useRef, useEffect } from "react";
// Components
import Toast from "./Toast";

type Props = {
  data: object[];
  removeToast: (id: number) => void;
};

export default function Toasts({ data, removeToast }: Props) {
  const listRef = useRef(null);

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [data]);

  function handleScrolling(element: HTMLElement) {
    element?.scrollTo(0, element.scrollHeight);
  }

  return (
    data.length > 0 && (
      <ul className="toast-list" aria-live="assertive">
        {data.map((toast) => (
          <Toast
            altText={toast.altText}
            handleClose={() => removeToast(toast.id)}
            key={toast.id}
            message={toast.message}
            type={toast.type}
          />
        ))}
      </ul>
    )
  );
}
