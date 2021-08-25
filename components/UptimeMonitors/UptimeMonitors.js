import PropTypes from "prop-types";
import UptimeMonitor from "./UptimeMonitor";

const UptimeMonitors = ({ hostname, uptimeMonitors }) => {
  const renderUptimeMonitors = () => {
    if (uptimeMonitors.length === 0) {
      return (
        <div className="max-w-lg mx-auto bg-white shadow-sm rounded px-6 py-5">
          <p className="text-gray-700 italic">No uptime monitors added yet.</p>
        </div>
      );
    }

    return uptimeMonitors.map((m) => (
      <UptimeMonitor key={m.url} uptimeMonitor={m} hostname={hostname} />
    ));
  };
  return (
    <section className="mt-16 mb-20">
      <div className="container">
        <div className="max-w-lg mx-auto bg-white shadow-sm rounded divide-y divide-gray-200">
          {renderUptimeMonitors()}
        </div>
      </div>
    </section>
  );
};

UptimeMonitors.propTypes = {
  uptimeMonitors: PropTypes.array.isRequired,
  hostname: PropTypes.string.isRequired,
};

export default UptimeMonitors;
