export default function LoadingSpinner({ color }) {
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
