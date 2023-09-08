import { useContext } from "react";
import { UserContext } from "../../../App";
//Assets
import newResponse from "../../../assets/img/file-circle-plus-solid.svg";
//Internal
import { currentDate } from "../../../helpers";
//Components
import MemberResponse from "./MemberResponse";
import ActionsBtn from "./ActionsBtn";

export default function MemberView({
  responses,
  handleDelete,
  handleSubmitEdits,
  handleSignInClick,
}) {
  const user = useContext(UserContext);

  /**
   * Searches the responses array for a response that the current user has submitted and returns that response. If the response does not exist, returns undefined.
   *
   * @returns {object} the user response containing the userID that matches the current user's advizotID, if it exists
   */
  const responseUserID = () =>
    responses.find((response) => response.userID === user.advizotID);

  return (
    <article className="responses-section">
      <h1 className="meeting-heading">
        {user.group} {currentDate("month")}
      </h1>

      {responses.length === 0 ? (
        <h2>There are no responses right now.</h2>
      ) : (
        <ul className="responses-ul">
          {responses.map((response, index) => {
            return (
              <MemberResponse
                key={`${response.date}${index}`}
                responseBody={response}
                handleDelete={handleDelete}
                handleSubmitEdits={handleSubmitEdits}
              />
            );
          })}
        </ul>
      )}

      {/* Only allow user to add a sign-in response if they have not added one during this meeting */}
      {responseUserID()?.userID !== user.advizotID && (
        <ActionsBtn handleClick={handleSignInClick}>
          Sign In
          <img src={newResponse} alt="Add Response" className="add-icon" />
        </ActionsBtn>
      )}
    </article>
  );
}
