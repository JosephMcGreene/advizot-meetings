//Components
import AdminResponses from "../responses/AdminResponses";
import ActionsMenu from "../utilities/ActionsMenu";

export default function AdminContent(props) {
  return (
    <>
      <AdminResponses
        sortedResponses={props.sortedResponses}
        onDelete={props.onDelete}
        loading={props.loading}
      />

      <ActionsMenu />
    </>
  );
}
