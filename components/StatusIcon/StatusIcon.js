import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

const iconMapping = {
  success: {
    icon: faCheck,
    style: "bg-green-500 text-white",
  },
  warning: {
    icon: faExclamation,
    style: "bg-orange-500 text-white",
  },
  error: {
    icon: faExclamation,
    style: "bg-red-500 text-white",
  },
  default: {
    icon: faInfo,
    style: "bg-gray-200 text-gray-700",
  },
};

const StatusIcon = ({ status }) => {
  const style = iconMapping[status].style;
  const icon = iconMapping[status].icon;

  return (
    <span
      className={`flex items-center justify-center h-4 w-4 rounded-full ${style}`}
    >
      <FontAwesomeIcon
        role="img"
        icon={icon}
        style={{ fontSize: "8px" }}
        fixedWidth
      />
    </span>
  );
};

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusIcon;
