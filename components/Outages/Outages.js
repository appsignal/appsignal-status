import PropTypes from "prop-types";
import OutagesByDay from "../OutagesByDay/OutagesByDay";
import { timeseriesByDay } from "../../utils";

const Outages = ({ timeseries, regions }) => {
  const filteredTimeseries = timeseriesByDay(timeseries, regions).filter(
    (timeserie) => {
      return Object.values(timeserie.values).reduce((a, b) => a + b, 0) > 0;
    }
  );

  if (filteredTimeseries.length > 0) {
    return (
      <ul className="space-y-6">
        {filteredTimeseries.reverse().map((timeserie) => (
          <li key={timeserie.timestamp}>
            <OutagesByDay timeserie={timeserie} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>No outages in the past 30 days</p>;
  }
};

Outages.propTypes = {
  timeseries: PropTypes.array.isRequired,
  regions: PropTypes.array.isRequired,
};

export default Outages;
