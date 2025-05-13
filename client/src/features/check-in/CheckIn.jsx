import { useContext } from "react";
import { UserContext } from "../../App";
// Components
import MeetingForm from "../meeting/form/MeetingForm";
import ModalTemplate from "../../shared/modals/ModalTemplate";
// External
import { useNavigate } from "react-router-dom";

export default function CheckIn() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <ModalTemplate
      title="Check-In Form"
      handleClose={() => navigate(`/meeting/${user.group}`)}
    >
      <MeetingForm />
    </ModalTemplate>
  );
}
