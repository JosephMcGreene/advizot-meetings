export default function Modal({ title, onClose, body }) {
  return (
    <div className="modal">
      <div className="modal-content login-box">
        <div className="modal-header">
          <span className="modal-heading">{title}</span>
          <button className="close-x" onClick={() => onClose()}>
            &times;
          </button>
        </div>

        {body}
      </div>
    </div>
  );
}
