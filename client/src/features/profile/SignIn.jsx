import { ReactComponent as EditPen } from "../../assets/img/pen-solid.svg";
//Helpers
import { parseDate } from "../../helpers";

export default function SignIn({ date, monthlyGoal }) {
  // TODO Figure Out exactly what needs to be displayed in this component
  return (
    <li className="profile-sign-in">
      <EditPen className="edit-pen" />
      {console.log(typeof new Date(date))}
      <h3>
        {parseDate("month", new Date(date))} {parseDate("day", new Date(date))},{" "}
        {parseDate("year", new Date(date))}
      </h3>

      <p>
        <u>Goal:</u> {monthlyGoal}
      </p>
    </li>
  );
}
