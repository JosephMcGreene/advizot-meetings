import { useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../../App";
//External
import { motion } from "framer-motion";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

export default function ModalTemplate({ children, title, handleClose }) {
  const isDark = useContext(ThemeContext);
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleClose());

  return createPortal(
    <div className={isDark ? "modal dark" : "modal"}>
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        ref={modalRef}
        className="modal-content"
      >
        <header className="modal-header">
          <span className="modal-heading">{title}</span>
          <button className="close-x" onClick={() => handleClose()}>
            &times;
          </button>
        </header>

        {children}
      </motion.div>
    </div>,
    document.querySelector(".App")
  );
}
