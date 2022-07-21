export default function Modal({ responses, showResponses, onClose }) {
	if (!showResponses) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header" onClick={() => onClose()}>
					<button className="close-x">&times;</button>
				</div>
				<ul className="responses-ul modal-body">
					{responses.length > 0 ? (
						responses.map((response) => {
							return (
								<li
									className="response-li"
									key={
										response.name +
										response.business +
										response.personal +
										response.relationships
									}
								>
									<p className="response-p">
										{/* <strong>Name</strong> */}
										<em>{response.name}:</em>
										<br />
									</p>
									<p className="response-p">
										<strong>Business</strong> <br />
										{response.business}
									</p>
									<p className="response-p">
										<strong>Personal</strong> <br />
										{response.personal}
									</p>
									<p className="response-p">
										<strong>People</strong> <br />
										{response.relationships}
									</p>
									<p className="response-p">
										<strong>Today's Issue</strong> <br />
										{response.monthlyIssue}
									</p>
									<p className="response-p">
										<strong>Goal Before Next Meeting</strong> <br />
										{response.monthlyGoal}
									</p>
								</li>
							);
						})
					) : (
						<span>No responses yet</span>
					)}
				</ul>
				<div className="modal-footer">
					<button className="btn" onClick={() => onClose()}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
