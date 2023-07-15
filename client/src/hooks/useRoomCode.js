import { useState } from "react";
import { axiosFetch } from "../helpers";

export default function useRoomCode() {
  const [loading, setLoading] = useState(false);

  /**
   * Calls the server to update the room code and send it back to the user, or only send the existing room code, then updatews the user's local storage with the new room code
   *
   * @param {boolean} needNewCode Whether or not the user has decided to create a new room code
   */
  async function setRoomCode(needNewCode) {
    try {
      setLoading(true);

      const roomCodeResponse = await axiosFetch(
        "post",
        "/roomCode/setRoomCode",
        { needNewCode }
      );

      localStorage.setItem(
        "roomCode",
        roomCodeResponse.data.roomCodeDB.currentRoomCode.toString()
      );
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return [setRoomCode, loading];
}
