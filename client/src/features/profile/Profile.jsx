import { useState, useEffect } from "react";
//Assets
import { ReactComponent as EditPen } from "../../assets/img/pen-solid.svg";
//External
import { useParams } from "react-router-dom";
//Internal
import { axiosFetch } from "../../helpers";
import useToasts from "../../hooks/useToasts";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import SignIn from "./SignIn";

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState("");
  const [signIns, setSignIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { showToast } = useToasts();

  useEffect(() => {
    fetchProfileData("post", "/profile", setPersonalInfo);
    fetchProfileData("post", "/profile/signIns", setSignIns);
  }, []);

  async function fetchProfileData(method, url, setState) {
    try {
      setLoading(true);

      const { data } = await axiosFetch(method, url, { id });

      setState(data);
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <section className="profile">
      {console.log(signIns)}
      <article className="basic-info" id="basicInfo">
        <img
          className="profile-photo"
          src={personalInfo.photo}
          alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
        />
        <label htmlFor="basicInfo">
          <h1>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h3>
            {personalInfo.role === "admin" ? "Chair" : `${personalInfo.group}`}
          </h3>
        </label>
        {/* <EditPen className="edit-pen" /> */}
      </article>

      <article className="profile-sign-ins">
        <h2>Sign-In History</h2>

        <ul className="sign-in-history">
          {signIns.map((signIn, index) => (
            <SignIn signIn={signIn} key={signIn.date + index} />
          ))}
          {/* TODO Implement Pagination here? */}
        </ul>
      </article>
    </section>
  );
}
