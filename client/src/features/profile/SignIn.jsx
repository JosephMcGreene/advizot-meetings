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

      {detailsShown && (
        <ModalTemplate
          title={`${signInDate}`}
          handleClose={() => setDetailsShown(false)}
        >
          {signIn._id}
        </ModalTemplate>
      )}
    </>
  );
}
