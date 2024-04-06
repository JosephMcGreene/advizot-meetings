import { useContext } from "react";
import { UserContext } from "../../../../App";
//Assets
import { ReactComponent as NewSignInIcon } from "../../../../assets/img/file-circle-plus-solid.svg";
//Components
import MemberSignIns from "./MemberSignIns";
import ActionsBtn from "../ActionsBtn";

export default function MemberView({
  signIns,
  handleDelete,
  handleSubmitEdits,
  handleSignInClick,
}) {
  return (
    <>
      <MemberSignIns
        signIns={signIns}
        handleDelete={handleDelete}
        handleSubmitEdits={handleSubmitEdits}
        handleSignInClick={handleSignInClick}
      />

      <CheckInBtn signIns={signIns} />
    </>
  );
}

function CheckInBtn({ signIns, handleSignInClick }) {
  const user = useContext(UserContext);

  /**
   * Searches the sign-ins array for a sign-in that the user has submitted and returns that sign-in. If the sign-in does not exist, returns undefined.
   *
   * @returns {object} the sign-in containing the userID that matches the current user's advizotID, if it exists
   */
  const signInOfUser = () =>
    signIns.find((signIn) => signIn.userID === user.advizotID);

  return (
    <>
      {/* Only allow user to add a sign-in response if they have not added one during this meeting */}
      {signInOfUser()?.userID !== user.advizotID && (
        <ActionsBtn handleClick={handleSignInClick}>
          Check In
          <NewSignInIcon className="add-icon" />
        </ActionsBtn>
      )}
    </>
  );
}
