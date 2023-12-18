import { useContext } from "react";
import { UserContext } from "../../../../App";
//Assets
import { ReactComponent as NewSignInIcon } from "../../../../assets/img/file-circle-plus-solid.svg";
//Internal
import { currentDate } from "../../../../helpers";
//Components
import MemberSignIn from "./MemberSignIn";
import ActionsBtn from "../ActionsBtn";

export default function MemberView({
  signIns,
  handleDelete,
  handleSubmitEdits,
  handleSignInClick,
}) {
  const user = useContext(UserContext);

  /**
   * Searches the sign-ins array for a sign-in that the user has submitted and returns that sign-in. If the sign-in does not exist, returns undefined.
   *
   * @returns {object} the sign-in containing the userID that matches the current user's advizotID, if it exists
   */
  const signInOfUser = () =>
    signIns.find((signIn) => signIn.userID === user.advizotID);

  return (
    <section className="sign-ins-section">
      <h1 className="meeting-heading">
        {user.group === "guest" ? "Guests" : user.group} -{" "}
        {`${currentDate("month")} ${currentDate("year")}`}
      </h1>

      {signIns.length === 0 ? (
        <h2 className="centered-heading">
          There is no one signed in right now.
        </h2>
      ) : (
        <ul className="sign-ins-ul">
          {signIns.map((signIn, index) => {
            return (
              <MemberSignIn
                key={`${signIn.date}${index}`}
                signInBody={signIn}
                handleDelete={handleDelete}
                handleSubmitEdits={handleSubmitEdits}
              />
            );
          })}
        </ul>
      )}

      {/* Only allow user to add a sign-in response if they have not added one during this meeting */}
      {signInOfUser()?.userID !== user.advizotID && (
        <ActionsBtn handleClick={handleSignInClick}>
          Check In
          <NewSignInIcon className="add-icon" />
        </ActionsBtn>
      )}
    </section>
  );
}
