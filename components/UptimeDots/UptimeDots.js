import PropTypes from "prop-types";

import UptimeDot from "../UptimeDot";
import { timeseriesByDay } from "../../utils";

const UptimeDots = ({ timeseries = new Array(30), loading }) => {
  console.log(timeseries);
  return (
    <div className="flex space-x-1">
      {timeseriesByDay(timeseries)
        .slice(-30, timeseries.length)
        .map((timeserie) => (
          <UptimeDot
            key={timeserie.timestamp}
            timeserie={timeserie}
            loading={loading}
          />
        ))}
    </div>
  );
};

UptimeDots.propTypes = {
  timeseries: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UptimeDots;
