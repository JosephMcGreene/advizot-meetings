export default function SignIn({ signIn }) {
  return (
    <li className="profile-sign-in">
      <h3>
        <b>{signIn.date}</b>
      </h3>
      <p>{signIn.priority}</p>
      <p>{signIn.monthlyGoal}</p>
    </li>
  );
}
