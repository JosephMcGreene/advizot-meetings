export default function SignIn({ signIn }) {
  // TODO Figure Out exactly what needs to be displayed in this component
  return (
    <li className="profile-sign-in">
      {/* TODO Format Date */}
      <h3>{signIn.date}</h3>

      <p>{signIn.monthlyGoal}</p>
    </li>
  );
}
