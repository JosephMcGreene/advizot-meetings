import { useState, useEffect, useRef } from "react";

// export default function useOutsideClick(initialState) {
//   const triggerRef = useRef(null);
//   const nodeRef = useRef(null);

//   const [show, setShow] = useState(initialState);

//   useEffect(() => {
//     document.addEventListener("click", handleOutsideClick, true);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick, true);
//     };
//   }, []);

//   function handleOutsideClick(event) {
//     if (triggerRef.current && triggerRef.current.contains(event.target)) {
//       return setShow(!show);
//     }

//     if (nodeRef.current && !nodeRef.current.contains(event.target)) {
//       return setShow(false);
//     }
//   }

//   return { triggerRef, nodeRef, show, setShow };
// }

export default function useOutsideClick(elementRef, callback) {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    function handleOutsideClick(event) {
      if (elementRef?.current?.contains(event.target) && callback) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [callbackRef, elementRef]);
}
