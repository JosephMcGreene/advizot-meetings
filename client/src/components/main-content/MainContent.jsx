import { useContext } from "react";
import { UserContext } from "../../App";
//External
import { Link } from "react-router-dom";
//Internal
import MeetingForm from "../form/MeetingForm";
import Responses from "../responses/Responses";
import projectorScreen from "../../img/display-solid.svg";

export default function MainContent({
	onSubmit,
	responses,
	loading,
	onSubmitEdits,
	onDelete,
}) {
	const currentUser = useContext(UserContext);

	return (
		<main className="main-content">
			<h1 className="welcome">Hello, {currentUser.firstName}!</h1>

			<nav className="nav-icons">
				<ul className="nav-btn-list">
					<li className="nav-item">
						<Link to="/projection" className="btn nav-btn">
							<img
								src={projectorScreen}
								alt="projection icon"
								className="nav-icon"
							/>
						</Link>
					</li>
				</ul>
			</nav>

			<MeetingForm
				onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
			/>

			<Responses
				responses={responses}
				loading={loading}
				onSubmitEdits={(userEdit) => onSubmitEdits(userEdit)}
				onDelete={(responseToDelete) => onDelete(responseToDelete)}
			/>
		</main>
	);
}
