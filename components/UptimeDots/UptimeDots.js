import PropTypes from "prop-types";

import UptimeDot from "../UptimeDot/UptimeDot";
import { fillMissingDataPoints, timeseriesByDay } from "../../utils";

const UptimeDots = ({ timeseries, regions, threshold }) => {
  const filledTimeseries = fillMissingDataPoints(
    timeseriesByDay(timeseries, regions).slice(-30, timeseries.length),
    30
  );

  return (
    <div className="flex space-x-1">
      {filledTimeseries.slice(-30, filledTimeseries.length).map((timeserie) => (
        <UptimeDot
          key={timeserie.timestamp}
          timeserie={timeserie}
          threshold={threshold}
        />
      ))}
    </div>
  );
};

UptimeDots.propTypes = {
  timeseries: PropTypes.array.isRequired,
  regions: PropTypes.array.isRequired,
  threshold: PropTypes.number,
};

export default UptimeDots;
