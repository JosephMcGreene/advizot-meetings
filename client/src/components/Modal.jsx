export default function Modal({ responses, showModal, onClose }) {
	if (!showModal) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header" onClick={() => onClose()}>
					<button className="close-x">&times;</button>
				</div>
				<div className="responses-ul modal-body"></div>
				<div className="modal-footer">
					<button className="btn" onClick={() => onClose()}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
