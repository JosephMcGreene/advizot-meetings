import MeetingForm from "./form/MeetingForm";
import Responses from "./responses/Responses";

export default function MeetingContent({
	onSubmit,
	responses,
	loading,
	onSubmitEdits,
	onDelete,
}) {
	return (
		<>
			<MeetingForm onSubmit={onSubmit} />

			<Responses
				responses={responses}
				loading={loading}
				onSubmitEdits={onSubmitEdits}
				onDelete={onDelete}
			/>
		</>
	);
}
