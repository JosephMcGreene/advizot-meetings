import { useRef } from "react";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";
import { motion } from "framer-motion";

export default function ModalTemplate({ children, title, onClose }) {
  const modalRef = useRef();
  useOutsideClick(modalRef, () => onClose());

  return (
    <div className="modal">
      <motion.div
        className="modal-content"
        ref={modalRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <header className="modal-header">
          <span className="modal-heading">{title}</span>
          <button className="close-x" onClick={() => onClose()}>
            &times;
          </button>
        </header>

        {children}
      </motion.div>
    </div>
  );
}
