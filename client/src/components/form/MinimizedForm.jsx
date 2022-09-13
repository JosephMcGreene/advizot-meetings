import chevron from "../../img/chevron-up-solid.svg";

export default function MinimizedForm({ expandForm }) {
	return (
		<div className="minimized-form">
			<button onClick={() => expandForm()} className="minimize-btn">
				<img src={chevron} alt="Close Form" className="chevron-flipped" />
			</button>
		</div>
	);
}
