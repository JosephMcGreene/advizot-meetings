import { useState, useContext } from "react";
import { UserContext } from "../../App";
//External
import { Link } from "react-router-dom";
//Internal
import MeetingForm from "../form/MeetingForm";
import Responses from "../responses/Responses";
//Assets
import projectorScreen from "../../assets/img/users-viewfinder-solid.svg";
import showEye from "../../assets/img/eye-solid.svg";
import hideEye from "../../assets/img/eye-slash-solid.svg";

export default function MainContent({
	onSubmit,
	responses,
	loading,
	onSubmitEdits,
	onDelete,
}) {
	const [formVisibility, setFormVisibility] = useState(true);
	const currentUser = useContext(UserContext);

	return (
		<main className="main-content">
			<h1 className="welcome">Hello, {currentUser.firstName}!</h1>

			<ul className="util-list">
				<li className="util-item">
					<button
						className="btn util-btn"
						onClick={() => setFormVisibility(!formVisibility)}
					>
						<img
							className="util-icon"
							src={formVisibility ? hideEye : showEye}
							alt="form-close icon"
						/>
					</button>
				</li>

				<li className="util-item">
					<Link to="/projection" className="btn util-btn">
						<img
							className="util-icon"
							src={projectorScreen}
							alt="projection icon"
						/>
					</Link>
				</li>
			</ul>

			{formVisibility && (
				<MeetingForm
					onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
				/>
			)}

			<Responses
				responses={responses}
				loading={loading}
				onSubmitEdits={(userEdit) => onSubmitEdits(userEdit)}
				onDelete={(responseToDelete) => onDelete(responseToDelete)}
			/>
		</main>
	);
}
