export default function Response({ userResponseBody }) {
	return (
		<li className="response-li">
			<span className="response-name">
				<strong>{userResponseBody.userName}</strong>
			</span>

			<span className="response-p priority">
				<strong>Priority:</strong> {userResponseBody.priority.substring(1)}
			</span>

			<span className="response-p range-response">
				<strong>Business</strong>
				<br />
				{userResponseBody.business}
			</span>

			<span className="response-p range-response">
				<strong>Personal</strong>
				<br />
				{userResponseBody.personal}
			</span>

			<span className="response-p range-response">
				<strong>Relationships</strong>
				<br />
				{userResponseBody.relationships}
			</span>

			<article className="response-p issue">
				<h4>
					<strong>Today's Issue</strong>
				</h4>
				<br />
				<p>{userResponseBody.monthlyIssue}</p>
			</article>

			<article className="response-p goal">
				<h4>
					<strong>Goal Before Next Meeting</strong>
				</h4>
				<br />
				<p>{userResponseBody.monthlyGoal}</p>
			</article>
		</li>
	);
}
