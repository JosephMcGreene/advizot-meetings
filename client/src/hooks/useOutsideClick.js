import { useEffect, useRef } from "react";

export default function useOutsideClick(callback, elementRef) {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    function handleOutsideClick(event) {
      if (elementRef.current && !elementRef?.current?.contains(event.target)) {
        // console.log("I heard it!");
        callbackRef.current(event);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callbackRef, elementRef]);
}
