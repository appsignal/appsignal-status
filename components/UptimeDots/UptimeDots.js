import PropTypes from "prop-types";
import dayjs from "dayjs";

import UptimeDot from "../UptimeDot";

export const sortedTimeseries = (timeseries) => {
  return timeseries.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
};

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
