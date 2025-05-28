import { useState, useContext } from "react";
import { ToastContext } from "../App";
// Internal
import { axiosFetch } from "../helpers";

export default function useRoomCode() {
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  /**
   * Calls the server to update the room code and send it back to the user, or only send the existing room code, then updates the user's local storage with the new room code.
   */
  async function setRoomCode() {
    try {
      setLoading(true);

      const response = await axiosFetch("get", "/roomCode");
      const newRoomCode = response.data.roomCodeDB.currentRoomCode.toString();

      localStorage.setItem("roomCode", newRoomCode);

      await showToast("success", `Room Code changed to ${newRoomCode}`);
    } catch (err) {
      await showToast(
        "failure",
        "Something went wrong, unable to set Room Code"
      );
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [setRoomCode, loading];
}
