import Response from "./Response";

export default function Responses({ responses, onSubmitEdits, onDelete }) {
	//Sort responses to be displayed in order of priority
	const sortedResponses = responses.sort((a, b) => {
		if (a.priority < b.priority) return -1;
		return 1;
	});

	return (
		<>
			{/* Only show Responses header if there are responses to display */}
			{responses.length > 0 ? (
				<h2 className="responses-header">Responses</h2>
			) : (
				""
			)}

			<ul className="responses-ul">
				{sortedResponses.map((response) => {
					return (
						<Response
							key={
								response.priority +
								response.personal +
								response.business +
								response.relationships +
								response.date
							}
							userResponseBody={response}
							onSubmitEdits={onSubmitEdits}
							onDelete={onDelete}
						/>
					);
				})}
			</ul>
		</>
	);
}
