import failIcon from "../assets/img/skull-solid.svg";
import successIcon from "../assets/img/check-solid.svg";
import warningIcon from "../assets/img/exclamation-solid.svg";

type Props = {
  altText: string;
  message: string;
  type: string;
  handleClose: () => void;
};

export default function Toast({ altText, message, type, handleClose }: Props) {
  const iconMap: object = {
    success: successIcon,
    failure: failIcon,
    warning: warningIcon,
  };

  const icon: object | null = iconMap[type] || null;

  return (
    <aside className="toast" role="alert">
      <div className="toast-message">
        {icon && <img src={icon} alt={altText} />}
        <p>{message}</p>
      </div>
      <button className="close-x" onClick={handleClose}>
        &times;
      </button>
    </aside>
  );
}
