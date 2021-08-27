import PropTypes from "prop-types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import UptimeDot from "../UptimeDot";

export const sortedTimeseries = (timeseries) => {
  return timeseries.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
};

export const timeseriesByDay = (timeseries) => {
  return sortedTimeseries(timeseries.slice()).reduce((group, timeserie) => {
    const startOfDay = dayjs(timeserie.timestamp).startOf("day").utc().format();

    let currentGroup = group.filter((item) => item.timestamp === startOfDay)[0];

    if (!currentGroup) {
      currentGroup = {
        timestamp: startOfDay,
        values: {},
      };

      group.push(currentGroup);
    }

    Object.keys(timeserie.values).map((region) => {
      if (!currentGroup.values[region]) currentGroup.values[region] = 0;
      currentGroup.values[region] += timeserie.values[region];
    });

    return group;
  }, []);
};

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
