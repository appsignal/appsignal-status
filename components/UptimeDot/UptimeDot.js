import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import { formatRegion } from "../../utils";

const state = (timeserie, threshold) => {
  if (timeserie.missingDataPoint) return "missing";
  return Object.values(timeserie.values).reduce((a, b) => Math.max(a, b)) >
    threshold
    ? "down"
    : "up";
};

export const downtimeSummary = (timeserie, threshold) => {
  if (state(timeserie, threshold) === "missing")
    return <p>We are missing datapoints for this day</p>;
  if (state(timeserie, threshold) === "up")
    return <p>{`No downtimes under ${threshold} minutes`}</p>;

  return Object.keys(timeserie.values).map((region) => {
    const downtime = timeserie.values[region];
    if (downtime > threshold) {
      return (
        <p key={region}>
          {formatRegion(region)} down for {downtime} minutes
        </p>
      );
    }
  });
};

const UptimeDot = ({ timeserie, threshold }) => {
  const uptimeDate = dayjs(timeserie.timestamp).format("MMM. Do");

  const stateColor = {
    up: "bg-green-500",
    down: "bg-red-500",
    missing: "bg-gray-200",
  };

  return (
    <Tippy
      animation={false}
      content={
        <div className="text-center text-sm">
          <p className="text-gray-200">{uptimeDate}</p>
          <div>{downtimeSummary(timeserie, threshold)}</div>
        </div>
      }
    >
      <div
        data-testid="uptimeDot"
        className={`h-8 flex-grow ${
          stateColor[state(timeserie, threshold)]
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
  threshold: PropTypes.number,
};

UptimeDot.defaultProps = {
  threshold: 5,
};

export default UptimeDot;
