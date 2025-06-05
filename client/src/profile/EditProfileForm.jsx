export default function EditProfileForm({ handleClose, userInfoToEdit }) {
  return (
    <form>
      <button className="btn" onClick={() => handleClose()}>
        Done
      </button>
    </form>
  );
}
