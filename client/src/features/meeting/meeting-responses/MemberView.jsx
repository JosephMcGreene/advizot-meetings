import { useContext } from "react";
import { UserContext } from "../../../App";
//Assets
import newResponse from "../../../assets/img/file-circle-plus-solid.svg";
//Internal
import { currentDate } from "../../../helpers";
//Components
import Response from "./Response";
import ActionsBtn from "./ActionsBtn";

export default function MemberView({
  responses,
  onDelete,
  submitEdits,
  handleNewResponseClick,
}) {
  const user = useContext(UserContext);

  const findResponseUserID = () =>
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
              <Response
                key={`${response.date}${index}`}
                responseBody={response}
                onDelete={onDelete}
                submitEdits={submitEdits}
              />
            );
          })}
        </ul>
      )}

      {findResponseUserID()?.userID !== user.advizotID && (
        <ActionsBtn handleNewResponseClick={handleNewResponseClick}>
          Sign In
          <img src={newResponse} alt="Add Response" className="add-icon" />
        </ActionsBtn>
      )}
    </article>
  );
}
