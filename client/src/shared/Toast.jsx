//Assets
import successIcon from "../assets/img/check-solid.svg";
import failIcon from "../assets/img/skull-solid.svg";
import warningIcon from "../assets/img/exclamation-solid.svg";
//External
import { motion } from "framer-motion";

export default function Toast({ type, altText, message, handleClose }) {
  const iconMap = {
    success: successIcon,
    failure: failIcon,
    warning: warningIcon,
  };

  const icon = iconMap[type] || null;

  return (
    <motion.aside
      layout
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="toast"
      role="alert"
    >
      <div className="toast-message">
        {icon && <img src={icon} alt={altText} />}
        <p>{message}</p>
      </div>
      <button className="close-x" onClick={handleClose}>
        &times;
      </button>
    </motion.aside>
  );
}
