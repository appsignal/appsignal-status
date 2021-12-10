import PropTypes from "prop-types";

import Outage from "../Outage";

const OutagesByDay = ({ timeserie, threshold }) => {
  return (
    <>
      <h3 className="text-gray-700 mb-4">
        {new Date(timeserie.timestamp).toLocaleDateString()}
      </h3>
      {Object.keys(timeserie.values)
        .filter((region) => timeserie.values[region] > threshold)
        .map((region) => (
          <Outage
            outage={{ region, minutes: timeserie.values[region] }}
            key={region}
          />
        ))}
    </>
  );
};

OutagesByDay.propTypes = {
  timeserie: PropTypes.object.isRequired,
  threshold: PropTypes.number,
};

export default OutagesByDay;
