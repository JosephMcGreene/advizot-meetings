export default function Response({ responseBody }) {
	return (
		<li className="response-li">
			<span className="response-name">
				<strong>{responseBody.userName}</strong>
			</span>

			<span className="response-p priority">
				<strong>Priority:</strong> {responseBody.priority.substring(1)}
			</span>

			<span className="response-p range-response">
				<strong>Business</strong>
				<br />
				{responseBody.business}
			</span>

			<span className="response-p range-response">
				<strong>Personal</strong>
				<br />
				{responseBody.personal}
			</span>

			<span className="response-p range-response">
				<strong>Relationships</strong>
				<br />
				{responseBody.relationships}
			</span>

			<article className="response-p issue">
				<h4>
					<strong>Today's Issue</strong>
				</h4>
				<br />
				<p>{responseBody.monthlyIssue}</p>
			</article>

			<article className="response-p goal">
				<h4>
					<strong>Goal Before Next Meeting</strong>
				</h4>
				<br />
				<p>{responseBody.monthlyGoal}</p>
			</article>
		</li>
	);
}
