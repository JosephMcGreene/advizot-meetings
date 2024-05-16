//Assets
import { ReactComponent as ChartIcon } from "../../../assets/img/chart-line-solid.svg";
//External
import { Link, useOutletContext } from "react-router-dom";
//Components
import SignIn from "./SignIn";

export default function SignInHistory() {
  const [signIns, id] = useOutletContext();

  return (
    <article className="secondary-data">
      <h2>History</h2>
      <Link to={`/profile/${id}/trends`}>
        <ChartIcon className="chart" />
      </Link>

      <ul className="sign-in-history">
        {signIns.map((signIn) => (
          <SignIn signIn={signIn} key={signIn._id} />
        ))}
        {/* TODO Implement Pagination here? */}
      </ul>
    </article>
  );
}
