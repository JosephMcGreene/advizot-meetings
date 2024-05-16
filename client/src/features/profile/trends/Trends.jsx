import * as d3 from "d3";
import { useOutletContext } from "react-router-dom";

export default function Trends() {
  const [signIns, id] = useOutletContext();
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 20;
  const marginLeft = 20;

  const simplerData = signIns => {
    let array = [];
    for (let i = 0; i < signIns.length; i++) {
      array.push(signIns[i].personal);
    }
    return array;
  };

  const x = d3.scaleLinear(
    [0, signIns.length - 1],
    [marginLeft, width - marginRight],
  );
  const y = d3.scaleLinear(d3.extent(simplerData(signIns)), [
    height - marginBottom,
    marginTop,
  ]);
  const line = d3.line((d, i) => x(i), y);

  return (
    <section className="trends">
      <svg width={width} height={height}>
        <path
          fill="none"
          stroke="black"
          strokeWidth="1.5"
          d={line(simplerData(signIns))}
        />
        <g fill="black" stroke="black" strokeWidth="1.5">
          {simplerData(signIns).map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
          ))}
        </g>
      </svg>
    </section>
  );
}
