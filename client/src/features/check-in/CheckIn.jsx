import { useContext } from "react";
import { UserContext } from "../../App";
// Components
import MainForm from "../../shared/form/MainForm";
import ModalTemplate from "../../shared/modals/ModalTemplate";
// External
import { useNavigate } from "react-router-dom";
// Internal
import { currentDate } from "../../helpers";

export default function CheckIn() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <ModalTemplate
      handleClose={() => navigate(`/meeting/${user.group}`)}
      title={`${currentDate("month")} Check-In`}
    >
      <MainForm />
    </ModalTemplate>
  );
}
