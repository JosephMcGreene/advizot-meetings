import { useState } from "react";

//Components
import MemberSignIns from "../member-view/MemberSignIns";
import AdminSignIns from "./AdminSignIns";
import AdminActions from "../../admin-actions/AdminActions";

export default function AdminView({
  signIns,
  currentGroup,
  handleSubmitEdits,
  handleDelete,
  handleNewSignInClick,
}) {
  const [viewAsMember, setViewAsMember] = useState(false);

  return (
    <>
      {viewAsMember ? (
        <MemberSignIns
          signIns={signIns}
          handleSubmitEdits={handleSubmitEdits}
          handleDelete={handleDelete}
        />
      ) : (
        <AdminSignIns
          signIns={signIns}
          handleSubmitEdits={handleSubmitEdits}
          handleDelete={handleDelete}
        />
      )}

      <AdminActions
        currentGroup={currentGroup}
        handleNewSignInClick={handleNewSignInClick}
        viewAsMember={viewAsMember}
        handleViewAsMemberClick={() => setViewAsMember(!viewAsMember)}
      />
    </>
  );
}
