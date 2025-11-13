import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Markdown from "../Markdown/Markdown";

const iconMapping = {
  up: {
    outerStyle: "bg-green-200",
    innerStyle: "bg-green-500",
    icon: faCheck,
  },
  down: {
    outerStyle: "bg-red-200",
    innerStyle: "bg-red-500",
    icon: faExclamationTriangle,
  },
};

const CurrentStatus = ({ statusPage: { state, updates } }) => {
  const renderIcon = () => {
    const outerStyle = iconMapping[state].outerStyle;
    const innerStyle = iconMapping[state].innerStyle;
    const icon = iconMapping[state].icon;

    return (
      <div
        className={`flex items-center justify-center h-16 sm:h-20 w-16 sm:w-20 mx-auto rounded-full ${outerStyle}`}
      >
        <div
          className={`flex items-center justify-center h-12 sm:h-16 w-12 sm:w-16 rounded-full ${innerStyle}`}
        >
          <FontAwesomeIcon
            className="text-white text-2xl sm:text-3xl"
            icon={icon}
            fixedWidth
          />
        </div>
      </div>
    );
  };

  const lastUpdateMessage = updates
    .slice()
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .reverse()[0];

  return (
    <section className="mt-16">
      <div className="container text-center">
        {renderIcon()}
        <h1 className="mt-4 mb-3 c_h-heading c_h-heading--3xl sm:c_h-heading--4xl">
          {state === "up" ? "No known issues" : lastUpdateMessage?.title}
        </h1>
        {lastUpdateMessage?.description && (
          <Markdown className="mx-auto text-left max-w-md mt-16">
            {lastUpdateMessage.description}
          </Markdown>
        )}
      </div>
    </section>
  );
};

CurrentStatus.propTypes = {
  statusPage: PropTypes.shape({
    state: PropTypes.oneOf(["up", "down"]).isRequired,
    updates: PropTypes.array,
  }).isRequired,
};

export default CurrentStatus;
