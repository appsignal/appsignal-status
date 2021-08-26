import PropTypes from "prop-types";

import UptimeDot from "../UptimeDot";

const UptimeDots = ({ timeseries }) => {
  return (
    <div className="flex space-x-1">
      {timeseries.map((timeserie) => (
        <UptimeDot key={timeserie.timestamp} timeserie={timeserie} />
      ))}
    </div>
  );
};

UptimeDots.propTypes = {
  timeseries: PropTypes.array.isRequired,
};

export default UptimeDots;
