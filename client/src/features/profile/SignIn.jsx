import { useState } from "react";
//Helpers
import { parseDate } from "../../helpers";
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
        <h3>{signInDate}</h3>
        <p>
          <u>Goal:</u> {signIn.monthlyGoal}
        </p>
      </li>

      <hr />

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
      <li>Status: {signIn.priority.substring(1)}</li>
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
