export default function ModalTemplate({ body, title, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content login-box">
        <header className="modal-header">
          <span className="modal-heading">{title}</span>
          <button className="close-x" onClick={() => onClose()}>
            &times;
          </button>
        </header>

        {body}
      </div>
    </div>
  );
}
