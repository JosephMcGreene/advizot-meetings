export default function Responses({ currentUser, responses }) {
	const sortedResponses = responses.sort((a, b) => {
		if (a.priority < b.priority) return -1;
		return 1;
	});

	return (
		<ul className="responses-ul">
			{sortedResponses.map((response) => {
				return (
					<li
						className="response-li"
						key={
							response.business +
							response.personal +
							response.relationships +
							response.priority
						}
					>
						<span className="response-name">
							<strong>
								{currentUser.firstName} {currentUser.lastName}
							</strong>
						</span>

						<span className="response-p range-response">
							<strong>Business</strong>
							<br />
							{response.business}
						</span>

						<span className="response-p priority">
							<strong>Priority:</strong> {response.priority.substring(1)}
						</span>

						<span className="response-p range-response">
							<strong>Personal</strong>
							<br />
							{response.personal}
						</span>

						<span className="response-p range-response">
							<strong>People</strong>
							<br />
							{response.relationships}
						</span>

						<article className="response-p issue">
							<h4>
								<strong>Today's Issue</strong>
							</h4>
							<br />
							<p>{response.monthlyIssue}</p>
						</article>

						<article className="response-p goal">
							<h4>
								<strong>Goal Before Next Meeting</strong>
							</h4>
							<br />
							<p>{response.monthlyGoal}</p>
						</article>
					</li>
				);
			})}
		</ul>
	);
}
