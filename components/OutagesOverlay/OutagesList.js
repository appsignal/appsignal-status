import PropTypes from "prop-types";

import OutagesBox from "./OutagesBox";

const getOutagesPerDay = (outages) => {
  return outages.reduce((days, outage) => {
    const date = outage.from.split("T")[0];

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push(outage);
    return days;
  }, {});
};

const Outages = ({ outages }) => {
  const outagesPerDay = getOutagesPerDay(outages);

  return (
    <ul className="space-y-6">
      {Object.keys(outagesPerDay).map((day, index) => (
        <li key={index}>
          <h3 className="text-gray-700 mb-4">
            {new Date(day).toLocaleDateString()}
          </h3>
          <OutagesBox outages={outagesPerDay[day]} />
        </li>
      ))}
    </ul>
  );
};

Outages.propTypes = {
  outages: PropTypes.array.isRequired,
};

export default Outages;
