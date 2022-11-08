export default function LoadingSpinner({ color }) {
	//* props.color is "enumerated", which I put in quotes because I'm not sure exactly how to establish enums yet.
	//* can be "black" or "orange"
	return (
		<div
			className={
				color === "black"
					? "loading-spinner-big black"
					: "loading-spinner-big orange"
			}
		>
			<div className="loading-spinner-small"></div>
			<div className="block-square"></div>
		</div>
	);
}
