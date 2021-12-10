import OutagesByDay from "../OutagesByDay";
import { timeseriesByDay } from "../../utils";

const DEFAULT_THRESHOLD = 5;

const Outages = ({ timeseries, regions, threshold }) => {
  if (threshold === null) threshold = DEFAULT_THRESHOLD;
  const filteredTimeseries = timeseriesByDay(timeseries, regions).filter(
    (timeserie) => {
      return (
        Object.values(timeserie.values).reduce((a, b) => Math.max(a, b)) >
        threshold
      );
    }
  );

  if (filteredTimeseries.length > 0) {
    return (
      <ul className="space-y-6">
        {filteredTimeseries.reverse().map((timeserie) => (
          <li key={timeserie.timestamp}>
            <OutagesByDay timeserie={timeserie} threshold={threshold} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>No outages in the past 30 days</p>;
  }
};

export default Outages;
