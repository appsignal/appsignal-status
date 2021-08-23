import PropTypes from "prop-types";
import StatusIcon from "../StatusIcon/StatusIcon";

const Outage = ({ region, from, till }) => {
  return (
    <div className="flex justify-between p-4">
      <div className="w-1/2 flex items-center space-x-3">
        <StatusIcon status="error" />
        <p>
          Down from <span className="font-semibold">{region}</span>
        </p>
      </div>
      <p className="w-1/2 text-gray-700">
        {from} <br />
        {till}
      </p>
    </div>
  );
};

Outage.propTypes = {
  region: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  till: PropTypes.string.isRequired,
};

export default Outage;
