import PropTypes from "prop-types";

import StatusIcon from "../StatusIcon/StatusIcon";
import { formatRegion } from "../../utils";

const Outage = ({ outage: { region, minutes } }) => {
  return (
    <div className="flex justify-between p-4">
      <div className="w-1/2 flex items-center space-x-3">
        <StatusIcon status="identified" />
        <p>
          Down from
          <span className="font-semibold"> {formatRegion(region)}</span>
        </p>
      </div>
      <p className="w-1/2 text-gray-700">
        down for {minutes} {minutes === 1 ? "minute" : "minutes"}
      </p>
    </div>
  );
};

Outage.propTypes = {
  outage: PropTypes.shape({
    region: PropTypes.string.isRequired,
    minutes: PropTypes.number.isRequired,
  }).isRequired,
};

export default Outage;
