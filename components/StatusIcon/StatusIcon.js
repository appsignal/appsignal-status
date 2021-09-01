import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

const iconMapping = {
  resolved: {
    icon: faCheck,
    style: "bg-green-500 text-white",
  },
  identified: {
    icon: faExclamation,
    style: "bg-orange-500 text-white",
  },
  recovering: {
    icon: faExclamation,
    style: "bg-orange-500 text-white",
  },
  investigating: {
    icon: faExclamation,
    style: "bg-red-500 text-white",
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
