import PropTypes from "prop-types";

import Outage from "./Outage";

const OutagesBox = ({ outages }) => {
  return (
    <div className="bg-white shadow-sm rounded divide-y divide-gray-200">
      {outages.map((outage, index) => (
        <Outage
          key={index}
          status={outage.status}
          region={outage.region}
          from={outage.from}
          till={outage.till}
        />
      ))}
    </div>
  );
};

OutagesBox.propTypes = {
  outages: PropTypes.array.isRequired,
};

export default OutagesBox;
