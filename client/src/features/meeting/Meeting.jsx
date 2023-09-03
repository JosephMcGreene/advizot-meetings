import { useState, useContext } from "react";
import { UserContext } from "../../App";
//Helpers
import { currentDate } from "../../helpers";
//Hooks
import useMeeting from "../../hooks/useMeeting";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import ErrorPage from "../../shared/ErrorPage";
import AdminView from "./meeting-responses/AdminView";
import MemberView from "./meeting-responses/MemberView";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";

export default function Meeting() {
  const user = useContext(UserContext);

  const [formShown, setFormShown] = useState(false);

  const [
    responses,
    loading,
    error,
    getResponses,
    submitResponse,
    deleteResponse,
  ] = useMeeting("get", "/db/responses");

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      {user.role === "admin" && (
        <AdminView
          responses={responses}
          submitEdits={(responseToSubmit) => submitResponse(responseToSubmit)}
          onDelete={(responseID) => deleteResponse(responseID)}
          handleNewResponseClick={() => setFormShown(!formShown)}
          handleFilterSubmit={(filtersToSubmit) =>
            getResponses("post", "/db/responses/filters", filtersToSubmit)
          }
        />
      )}
      {user.role === "member" && (
        <MemberView
          responses={responses}
          onDelete={(responseID) => deleteResponse(responseID)}
          submitEdits={(responseToSubmit) => submitResponse(responseToSubmit)}
          handleNewResponseClick={() => setFormShown(!formShown)}
        />
      )}

      {formShown && (
        <ModalTemplate
          title={`${currentDate("month")}, ${currentDate("year")}`}
          handleClose={() => setFormShown(false)}
        >
          <MeetingForm
            onSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
            onClose={() => setFormShown(false)}
          />
        </ModalTemplate>
      )}
    </>
  );
}
