import { useContext } from "react";
import { UserContext } from "../../App";
//Components
import MeetingForm from "../form/MeetingForm";
import Responses from "../responses/Responses";
import UtilButtons from "../utilities/UtilButtons";

export default function MeetingContent({
  onSubmit,
  responses,
  loading,
  onFullscreen,
  fullscreen,
  onSubmitEdits,
  onDelete,
}) {
  const currentUser = useContext(UserContext);

  return (
    <main className="main-content">
      <h1 className="welcome">Hello, {currentUser.firstName}!</h1>

      <MeetingForm
        onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
      />

      <Responses
        responses={responses}
        loading={loading}
        onSubmitEdits={(userEdit) => onSubmitEdits(userEdit)}
        onDelete={(responseToDelete) => onDelete(responseToDelete)}
      />

      <UtilButtons />
    </main>
  );
}
