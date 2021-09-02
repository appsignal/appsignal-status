import PropTypes from "prop-types";

import UptimeDot from "../UptimeDot";
import { timeseriesByDay } from "../../utils";

const UptimeDots = ({ timeseries }) => {
  return (
    <div className="flex space-x-1">
      {timeseriesByDay(timeseries)
        .slice(-30, timeseries.length)
        .map((timeserie) => (
          <UptimeDot key={timeserie.timestamp} timeserie={timeserie} />
        ))}
    </div>
  );
};

UptimeDots.propTypes = {
  timeseries: PropTypes.array.isRequired,
};

export default UptimeDots;
