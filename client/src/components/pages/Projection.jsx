//External
import { Link } from "react-router-dom";
//Components
import Responses from "../responses/Responses";
//Assets
// import formIcon from "../../assets/img/align-left-solid.svg";
import formIcon from "../../assets/img/wpforms.svg";

export default function Projection({
	responses,
	loading,
	onSubmitEdits,
	onDelete,
}) {
	return (
		<main className="main-content">
			<nav className="nav-icons">
				<ul className="nav-btn-list">
					<li className="nav-item">
						<Link to="/" className="btn nav-btn">
							<img src={formIcon} alt="form icon" className="nav-icon" />
						</Link>
					</li>
				</ul>
			</nav>

			<Responses
				responses={responses}
				loading={loading}
				onSubmitEdits={onSubmitEdits}
				onDelete={onDelete}
			/>
		</main>
	);
}
