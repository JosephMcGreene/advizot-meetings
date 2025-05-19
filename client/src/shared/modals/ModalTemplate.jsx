import { createPortal } from "react-dom";
import { useRef } from "react";
// External
import { motion } from "framer-motion";
// Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

export default function ModalTemplate({ children, handleClose, title }) {
  const modalRef = useRef();

  useOutsideClick(modalRef, () => handleClose());

  return createPortal(
    <div className="modal">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        className="modal-content"
        ref={modalRef}
      >
        <header className="modal-header">
          <span className="modal-heading">{title}</span>
          <button className="close-x" onClick={() => handleClose()}>
            &times;
          </button>
        </header>

        <div className="modal-body">{children}</div>
      </motion.div>
    </div>,
    document.querySelector(".App")
  );
}
