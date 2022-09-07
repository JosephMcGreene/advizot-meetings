import editPen from "../../img/pen-solid.svg";

export default function ResponseDetail({
	text,
	userResponseBody,
	currentUser,
	className,
	inputValue,
}) {
	if (text === "Today's Issue" || text === "Goal Before Next Meeting") {
		return (
			<article className={className}>
				{userResponseBody.userName ===
				`${currentUser.firstName} ${currentUser.lastName}` ? (
					<button className="edit-icon">
						<img src={editPen} alt="Edit" className="edit-pen" />
					</button>
				) : (
					""
				)}
				<h4>
					<strong>{text}</strong>
				</h4>
				<br />
				<p>{inputValue}</p>
			</article>
		);
	}

	return (
		<span className={className}>
			{/* only show edit pen icon on hover to correct user: */}
			{userResponseBody.userName ===
			`${currentUser.firstName} ${currentUser.lastName}` ? (
				<button className="edit-icon">
					<img src={editPen} alt="Edit" className="edit-pen" />
				</button>
			) : (
				""
			)}
			<strong>{text}</strong>
			<br />
			{inputValue}
		</span>
	);
}
