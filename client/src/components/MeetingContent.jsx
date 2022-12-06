import { useState } from "react";
//Internal
import MeetingCode from "./modals/MeetingCode";
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
  const [meetingAccess, setMeetingAccess] = useState(false);

  /**
   * Assesses whether the passcode the user entered is correct or not
   * @param {String} inputCode the code the user entered
   * @returns {Function} changes the state of gaveCorrectPassCode to reflect whether the user can continue and view the rest of the app or must try again
   */
  function handlePasscodeSubmit(inputCode) {
    //TODO Change this dummy passcode to a randomly generated one
    if (inputCode === "123456") {
      alert("Welcome, enjoy the meeting!");
      return setMeetingAccess(true);
    }

    alert("That is not the correct code. Try again.");
    return setMeetingAccess(false);
  }

  if (!meetingAccess)
    return (
      <MeetingCode
        onCodeSubmit={(inputCode) => handlePasscodeSubmit(inputCode)}
      />
    );

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
