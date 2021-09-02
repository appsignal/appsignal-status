import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const formatRegion = (region) => {
  return region
    .split(/-| /)
    .map((region) => region.charAt(0).toUpperCase() + region.slice(1))
    .join(" ");
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

export const sortedTimeseries = (timeseries) => {
  return timeseries.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
};
