import { useContext, ReactNode } from "react";
import { UserContext } from "../../App";
// Internal
import RoomCodeEntry from "./RoomCodeEntry";

type Props = {
  children: ReactNode;
  handleSubmitCode: (enteredCode: string) => Function | Promise<void>;
};

export default function RoomCodeCheck({ children, handleSubmitCode }: Props) {
  const user = useContext(UserContext);

  if (!user.hasMeetingCode && user.role !== "admin") {
    return <RoomCodeEntry handleSubmit={handleSubmitCode} incorrectcode />;
  }

  return children;
}
