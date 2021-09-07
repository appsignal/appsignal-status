import PropTypes from "prop-types";

import UptimeDot from "../UptimeDot";
import { fillMissingDataPoints, timeseriesByDay } from "../../utils";

const UptimeDots = ({ timeseries }) => {
  const filledTimeseries = fillMissingDataPoints(
    timeseriesByDay(timeseries).slice(-30, timeseries.length),
    30
  );

  return (
    <div className="flex space-x-1">
      {filledTimeseries.slice(-30, filledTimeseries.length).map((timeserie) => (
        <UptimeDot key={timeserie.timestamp} timeserie={timeserie} />
      ))}
    </div>
  );
};

UptimeDots.propTypes = {
  timeseries: PropTypes.array.isRequired,
};

export default UptimeDots;
