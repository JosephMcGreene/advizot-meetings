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

      <ActionsBtn handleNewResponseClick={handleNewResponseClick}>
        <img src={newResponse} alt="Add Response" className="add-icon" />
      </ActionsBtn>
    </article>
  );
}
