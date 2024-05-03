import { ReactComponent as EditPen } from "../../assets/img/pen-solid.svg";

export default function SignIn({ signIn }) {
  // TODO Figure Out exactly what needs to be displayed in this component
  return (
    <li className="profile-sign-in">
      <EditPen className="edit-pen" />
      {/* TODO Format Date */}
      <h3>{signIn.date}</h3>

      <p>
        <u>Goal:</u> {signIn.monthlyGoal}
      </p>
    </li>
  );
}
