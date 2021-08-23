import PropTypes from "prop-types";
import UptimeMonitor from "./UptimeMonitor";

const UptimeMonitors = ({ uptimeMonitors }) => {
  return (
    <section className="mt-16 mb-20">
      <div className="container">
        <div className="max-w-lg mx-auto bg-white shadow-sm rounded divide-y divide-gray-200">
          {uptimeMonitors.map((m) => (
            <UptimeMonitor key={m.url} uptimeMonitor={m} />
          ))}
        </div>
      </div>
    </section>
  );
};

UptimeMonitors.propTypes = {
  uptimeMonitors: PropTypes.array.isRequired,
};

export default UptimeMonitors;
