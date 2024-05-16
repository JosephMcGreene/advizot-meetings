import { useOutletContext } from "react-router-dom";

export default function Trends() {
  const [signIns, id] = useOutletContext();
  return (
    <section className="trends">
      {console.log(signIns)}
      <h2>Come back soon to see trends!</h2>
    </section>
  );
}
