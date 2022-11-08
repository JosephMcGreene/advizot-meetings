import compressIcon from "../../assets/img/compress-solid.svg";
import expandIcon from "../../assets/img/expand-solid.svg";

export default function UtilButtons({ onFullscreen, fullscreen }) {
  return (
    <ul className="util-list">
      <li className="util-item">
        <button className="btn util-btn" onClick={onFullscreen}>
          <img
            className="util-icon"
            src={fullscreen ? compressIcon : expandIcon}
            alt="fullscreen eye"
          />
          <span className="util-text">
            {fullscreen ? "Fill In" : "Fullscreen Responses"}
          </span>
        </button>
      </li>
    </ul>
  );
}
