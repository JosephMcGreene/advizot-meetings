import { useRef } from "react";
//External
import { motion } from "framer-motion";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

export default function ModalTemplate({ children, title, handleClose }) {
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleClose());

  return (
    <div className="modal">
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
    </div>
  );
}
