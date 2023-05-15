import { useRef } from "react";
//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

export default function ModalTemplate({ children, title, onClose }) {
  const modalRef = useRef();
  useOutsideClick(modalRef, () => onClose());

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-content">
        <header className="modal-header">
          <span className="modal-heading">{title}</span>
          <button className="close-x" onClick={() => onClose()}>
            &times;
          </button>
        </header>

        {children}
      </div>
    </div>
  );
}
