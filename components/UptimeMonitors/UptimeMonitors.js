import PropTypes from "prop-types";
import UptimeMonitor from "../UptimeMonitor";

const UptimeMonitors = ({ statusPage }) => {
  const renderUptimeMonitors = () => {
    if (statusPage.uptime_monitors.length === 0) {
      return (
        <div className="max-w-lg mx-auto bg-white shadow-sm rounded px-6 py-5">
          <p className="text-gray-700 italic">No uptime monitors added yet.</p>
        </div>
      );
    }

    return statusPage.uptime_monitors.map((monitor) => (
      <UptimeMonitor
        key={monitor.url}
        uptimeMonitor={monitor}
        threshold={statusPage.threshold}
      />
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
  statusPage: PropTypes.shape({
    uptime_monitors: PropTypes.array.isRequired,
    threshold: PropTypes.number,
  }).isRequired,
};

export default UptimeMonitors;
