import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";

const Bar = () => {
  return (
    <Tippy
      content={
        <div className="text-center text-sm">
          <p className="text-gray-200">July 19th</p>
          <p>No outage</p>
        </div>
      }
    >
      <div className="h-8 flex-grow bg-green-500 rounded" />
    </Tippy>
  );
};

const UptimeMonitor = ({ uptimeMonitor }) => {
  return (
    <div className="px-6 py-5 space-y-3">
      <div className="sm:flex justify-between">
        <h2 className="c_h-heading">{uptimeMonitor.title}</h2>
        <p className="mt-1 sm:mt-0 text-gray-700">
          Monitoring from 4 locations
        </p>
      </div>
      <div className="flex space-x-1">
        {[...Array(30)].map((e, index) => (
          <Bar key={index} />
        ))}
      </div>
    </div>
  );
};

UptimeMonitor.propTypes = {
  uptimeMonitor: PropTypes.object.isRequired,
};

export default UptimeMonitor;
