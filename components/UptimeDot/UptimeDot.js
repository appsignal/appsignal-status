import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const formatRegion = (region) => {
  return region
    .split(/-| /)
    .map((region) => region.charAt(0).toUpperCase() + region.slice(1))
    .join(" ");
};

const state = (timeserieValues) =>
  Object.values(timeserieValues).reduce((a, b) => a + b) > 0 ? "down" : "up";

export const downtimeSummary = (timeserieValues) => {
  if (state(timeserieValues) === "up") return <p>No outage</p>;

  return Object.keys(timeserieValues).map((region) => {
    const downtime = timeserieValues[region];
    if (downtime > 0) {
      return (
        <p key={region}>
          {formatRegion(region)} down for {downtime} minutes
        </p>
      );
    }
  });
};

const UptimeDot = ({ timeserie }) => {
  const uptimeDate = dayjs(timeserie.timestamp).format("MMM. Do");

  return (
    <Tippy
      content={
        <div className="text-center text-sm">
          <p className="text-gray-200">{uptimeDate}</p>
          <div>{downtimeSummary(timeserie.values)}</div>
        </div>
      }
    >
      <div
        className={`h-8 flex-grow ${
          state(timeserie.values) === "up" ? "bg-green-500" : "bg-red-500"
        } rounded`}
      />
    </Tippy>
  );
};

UptimeDot.propTypes = {
  timeserie: PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
  }),
};

export default UptimeDot;
