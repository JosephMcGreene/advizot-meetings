export default function Responses({ responses }) {
	return (
		<ul className="responses-ul modal-body">
			{responses.map((response) => {
				return (
					<li
						className="response-li"
						key={
							response.name +
							response.business +
							response.personal +
							response.relationships +
							response.priority
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
							<strong>Priority</strong> <br />
							{response.priority}
						</p>
						<p className="response-p">
							<strong>Goal Before Next Meeting</strong> <br />
							{response.monthlyGoal}
						</p>
					</li>
				);
			})}
		</ul>
	);
}
