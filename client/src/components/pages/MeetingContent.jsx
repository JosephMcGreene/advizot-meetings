import { useContext } from "react";
import { UserContext } from "../../App";
//Components
import MeetingForm from "../form/MeetingForm";
import Responses from "../responses/Responses";
//Assets
// import projectorScreen from "../../assets/img/users-viewfinder-solid.svg";
import showEye from "../../assets/img/eye-solid.svg";
import hideEye from "../../assets/img/eye-slash-solid.svg";

export default function MeetingContent({
	onSubmit,
	responses,
	loading,
	onFullscreen,
	fullscreen,
	onSubmitEdits,
	onDelete,
}) {
	const currentUser = useContext(UserContext);

	return (
		<main className="main-content">
			{fullscreen && (
				<h1 className="welcome">Hello, {currentUser.firstName}!</h1>
			)}

			<ul className="util-list">
				<li className="util-item">
					<button className="btn util-btn" onClick={onFullscreen}>
						<img
							className="util-icon"
							src={fullscreen ? hideEye : showEye}
							alt="fullscreen eye"
						/>
						<span className="util-text">
							{fullscreen ? "Responses Only" : "Fill In"}
						</span>
					</button>
				</li>

				{/* <li className="util-item">
					<button className="btn util-btn" onClick={onFullscreen}>
						<img
							className="util-icon"
							src={projectorScreen}
							alt="projection icon"
						/>
						<span className="util-text">
							{fullscreen ? "Responses Only" : "Fill In"}
						</span>
					</button>
				</li> */}
			</ul>

			{fullscreen && (
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
