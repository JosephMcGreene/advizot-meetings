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

export default function Profile() {
  const [profileData, setProfileData] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { showToast } = useToasts();

  useEffect(() => {
    getProfileData();
  }, []);

  async function getProfileData() {
    try {
      setLoading(true);

      const { data } = await axiosFetch("post", "/profile", { id });

      setProfileData(data);
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
      <article className="basic-info" id="basicInfo">
        <img
          className="profile-photo"
          src={profileData.photo}
          alt={`${profileData.firstName} ${profileData.lastName}`}
        />
        <label htmlFor="basicInfo">
          <h1>
            {profileData.firstName} {profileData.lastName}
          </h1>
          <h3>
            {profileData.role === "admin" ? "Chair" : `${profileData.group}`}
          </h3>
        </label>
        {/* <EditPen className="edit-pen" /> */}
      </article>

      <article className="profile-sign-ins">
        <h2>Sign-In History</h2>

        <ul className="sign-in-history">
          {/* TODO Add a query for member's sign-in history */}
          {/* TODO Implement Pagination here? */}
        </ul>
      </article>
    </section>
  );
}
