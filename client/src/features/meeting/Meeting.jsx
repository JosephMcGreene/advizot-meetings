import { useState, useContext } from "react";
import { UserContext, ToastContext } from "../../App";
//External
import { Navigate } from "react-router-dom";
//Helpers
import { currentDate } from "../../helpers";
//Hooks
import useMeeting from "../../hooks/useMeeting";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import AdminView from "./meeting-responses/admin-view/AdminView";
import MemberView from "./meeting-responses/member-view/MemberView";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";

export default function Meeting() {
  const user = useContext(UserContext);
  const { showToast } = useContext(ToastContext);
  const [formShown, setFormShown] = useState(false);

  const [
    responses,
    loading,
    error,
    getResponses,
    submitResponse,
    deleteResponse,
  ] = useMeeting("get", `/db/responses/${user.group}`);

  if (loading) return <LoadingSpinner />;
  if (error) return <Navigate to="/error" />;

  return (
    <>
      {user.role === "admin" && (
        <AdminView
          responses={responses}
          handleSubmitEdits={async (responseToSubmit, existingResponse) => {
            await submitResponse(responseToSubmit, existingResponse);
            await showToast("success", "Edit Successful");
          }}
          handleDelete={async (responseID) => {
            await deleteResponse(responseID);
            await showToast("success", "Response deleted");
          }}
          handleNewResponseClick={() => setFormShown(!formShown)}
          handleFilterSubmit={(filtersToSubmit) =>
            getResponses("post", "/db/responses/filters", filtersToSubmit)
          }
        />
      )}
      {user.role === "member" && (
        <MemberView
          responses={responses}
          handleDelete={async (responseID) => {
            await deleteResponse(responseID);
            await showToast("success", "Response Deleted");
          }}
          handleSubmitEdits={async (responseToSubmit, existingResponse) => {
            await submitResponse(responseToSubmit, existingResponse);
            await showToast("success", "Edit Successful");
          }}
          handleSignInClick={() => setFormShown(!formShown)}
        />
      )}

      {formShown && (
        <ModalTemplate
          title={`${currentDate("month")}, ${currentDate("year")}`}
          handleClose={() => setFormShown(false)}
        >
          <MeetingForm
            handleSubmit={(responseToSubmit) =>
              submitResponse(responseToSubmit)
            }
            handleClose={() => setFormShown(false)}
          />
        </ModalTemplate>
      )}
    </>
  );
}
