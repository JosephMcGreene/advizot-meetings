import { useState } from "react";
//Assets
import { ReactComponent as ExpandIcon } from "../../../assets/img/expand-solid.svg";
import { ReactComponent as Checkmark } from "../../../assets/img/check-solid.svg";
//Helpers
import { parseDate } from "../../../helpers";
//Components
import ModalTemplate from "../../shared/modals/ModalTemplate";

export default function SignIn({ signIn }) {
  const [detailsShown, setDetailsShown] = useState(false);
  const signInDate = `${parseDate("month", new Date(signIn.date))} ${parseDate(
    "day",
    new Date(signIn.date)
  )}, ${parseDate("year", new Date(signIn.date))}`;

  return (
    <>
      <li className="profile-sign-in" onClick={() => setDetailsShown(true)}>
        <div>
          <h3>{signInDate}</h3>
          {signIn.priority === "zP" && <Checkmark className="check" />}
          <p>
            <u>Goal:</u> {signIn.monthlyGoal}
          </p>
        </div>

        <ExpandIcon className="icon" />
      </li>

      {detailsShown && (
        <ModalTemplate
          title={`${signInDate}`}
          handleClose={() => setDetailsShown(false)}
        >
          <SignInDetails signIn={signIn} setDetailsShown={setDetailsShown} />
        </ModalTemplate>
      )}
    </>
  );
}

function SignInDetails({ signIn, setDetailsShown }) {
  return (
    <ul>
      <li>
        Status: {signIn.priority === "zP" ? "Processed" : "Not Processed"}
      </li>
      <li>Personal: {signIn.personal}</li>
      <li>Relationships: {signIn.relationships}</li>
      <li>Business: {signIn.business}</li>
      <li>Issue: {signIn.monthlyIssue}</li>
      <li>Goal: {signIn.monthlyGoal}</li>

      <button className="btn" onClick={() => setDetailsShown(false)}>
        Done
      </button>
    </ul>
  );
}
