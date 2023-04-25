import { useEffect, useRef } from "react";

export default function useOutsideClick(elementRef, callback) {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!elementRef?.current?.contains(event.target)) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [callbackRef, elementRef]);
}
