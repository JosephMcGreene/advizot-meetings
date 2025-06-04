import { ChangeEvent, ReactNode, useEffect, useRef } from "react";

export default function useOutsideClick(
  callback: () => Function,
  elementRef: ReactNode
) {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    function handleOutsideClick(event: ChangeEvent<HTMLInputElement>) {
      if (!elementRef?.current?.contains(event.target)) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [callbackRef, elementRef]);
}
