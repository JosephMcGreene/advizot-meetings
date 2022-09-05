import Response from "./Response";

export default function Responses({ responses, currentUser }) {
	//Sort responses to be displayed in order of priority
	const sortedResponses = responses.sort((a, b) => {
		if (a.priority < b.priority) return -1;
		return 1;
	});

	return (
		<>
			<h2 className="responses-header">Responses</h2>

			<ul className="responses-ul">
				{sortedResponses.map((response) => {
					return (
						<Response
							key={
								response.priority +
								response.personal +
								response.business +
								response.relationships
							}
							userResponseBody={response}
							currentUser={currentUser}
						/>
					);
				})}
			</ul>
		</>
	);
}
