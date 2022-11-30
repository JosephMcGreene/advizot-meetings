import { useState } from "react";
//Internal
import MeetingForm from "./form/MeetingForm";
import Responses from "./responses/Responses";
import UtilButtons from "./utilities/UtilButtons";

export default function MeetingContent({
  onSubmit,
  responses,
  loading,
  onSubmitEdits,
  onDelete,
}) {
  const [showForm, setShowForm] = useState(true);

  return (
    <>
      <Responses
        responses={responses}
        loading={loading}
        onSubmitEdits={onSubmitEdits}
        onDelete={onDelete}
      />

      <UtilButtons openForm={() => setShowForm(true)} />

      {showForm && (
        <MeetingForm onSubmit={onSubmit} onClose={() => setShowForm(false)} />
      )}
    </>
  );
}
