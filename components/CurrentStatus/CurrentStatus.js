import PropTypes from "prop-types";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

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

const CurrentStatus = ({ state }) => {
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

  return (
    <section className="mt-16">
      <div className="container text-center">
        {renderIcon()}
        <h1 className="mt-4 mb-3 c_h-heading c_h-heading--3xl sm:c_h-heading--4xl">
          {state == "up" ? "No known issues" : "We’re experiencing issues"}
        </h1>
        <p className="text-gray-700">
          {state == "up" ? (
            <>
              Don{"'"}t agree with this? Please{" "}
              <a href="mailto:contact@appsignal.com">let us know</a>.
            </>
          ) : (
            <>
              Last updated at 15th Aug 07:53 CET. Read{" "}
              <Link href="#status-updates">
                <a>latest status update</a>
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </section>
  );
};

CurrentStatus.propTypes = {
  state: PropTypes.oneOf(["up", "down"]).isRequired,
};

export default CurrentStatus;
