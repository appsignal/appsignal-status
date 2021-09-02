import React from "react";
import PropTypes from "prop-types";

import OutagesOverlay from "../OutagesOverlay";
import UptimeDots from "../UptimeDots";

export const UptimeMonitorLoading = () => {
  return (
    <div className="flex space-x-1">
      {[...Array(30)].map((i) => (
        <div key={i} className="h-8 flex-grow rounded bg-gray-200" />
      ))}
    </div>
  );
};

const UptimeMonitor = ({ hostname, uptimeMonitor }) => {
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [monitor, setMonitor] = React.useState([]);

  React.useEffect(() => {
    // We use the mounted variable to make sure React stops trying to use state
    // when the component is unmounted.
    let mounted = true;
    fetch(
      `https://api.appsignal-status.online/status_pages/${Buffer.from(
        hostname
      ).toString("base64")}/monitors/${uptimeMonitor.id}.json`,
      {
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (mounted) {
          setMonitor(result);
          setLoading(false);
        }
      });

    return () => (mounted = false);
  }, [hostname, uptimeMonitor.id]);

  return (
    <>
      <div className="px-6 py-5 space-y-3">
        <div className="sm:flex justify-between">
          <h2>
            <button
              className="c_h-heading focus:outline-none"
              onClick={() => setOverlayOpen(true)}
            >
              {uptimeMonitor.title}
            </button>
          </h2>
          <p className="mt-1 sm:mt-0 text-gray-700">
            Monitoring from {uptimeMonitor.regions.length}{" "}
            {uptimeMonitor.regions?.length > 1 ? "locations" : "location"}
          </p>
        </div>
        {loading && <UptimeMonitorLoading />}
        {!loading && <UptimeDots timeseries={monitor.timeseries} />}
      </div>

      {!loading && (
        <OutagesOverlay
          open={overlayOpen}
          handleClose={() => setOverlayOpen(false)}
          timeseries={monitor.timeseries}
        />
      )}
    </>
  );
};

UptimeMonitor.propTypes = {
  uptimeMonitor: PropTypes.object.isRequired,
  hostname: PropTypes.string.isRequired,
};

export default UptimeMonitor;
