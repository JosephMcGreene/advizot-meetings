import Response from "./Response";

export default function Responses({ responses }) {
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
								response.date +
								response.business +
								response.personal +
								response.relationships +
								response.priority
							}
							responseBody={response}
						/>
					);
				})}
			</ul>
		</>
	);
}
