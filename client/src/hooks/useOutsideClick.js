import { useEffect, useRef } from "react";

export default function useOutsideClick(callback, elementRef) {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    function handleOutsideClick(event) {
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
