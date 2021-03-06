import PropTypes from "prop-types";

import StatusIcon from "../StatusIcon/StatusIcon";
import { formatRegion } from "../../utils";

const Outage = ({ outage: { region, minutes } }) => {
  return (
    <div
      className="bg-white shadow-sm rounded divide-y divide-gray-200 my-1"
      data-testid="outage"
    >
      <div className="flex justify-between p-4">
        <div className="w-full flex items-center space-x-3">
          <StatusIcon status="identified" />
          <p>
            Down from
            <span className="font-semibold"> {formatRegion(region)} </span>
            for {minutes} {minutes === 1 ? "minute" : "minutes"}
          </p>
        </div>
      </div>
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
