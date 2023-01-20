import React from "react";
import PropTypes from "prop-types";

import OutagesOverlay from "../OutagesOverlay";
import UptimeDots from "../UptimeDots";

export const LoadingDot = () => {
  return (
    <div
      data-testid="loadingDot"
      className={`h-8 flex-grow animate-pulse bg-gray-200 rounded`}
    />
  );
};

export const UptimeMonitorLoading = () => {
  const amountOfDots = 30;
  return (
    <div className="flex space-x-1">
      {[...Array(amountOfDots)].map((_, dotNumber) => {
        return <LoadingDot key={dotNumber} />;
      })}
    </div>
  );
};

const UptimeMonitor = ({ uptimeMonitor, threshold }) => {
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [monitor, setMonitor] = React.useState([]);

  React.useEffect(() => {
    // We use the mounted variable to make sure React stops trying to use state
    // when the component is unmounted.
    let mounted = true;
    fetch(uptimeMonitor.endpoint, { mode: "cors" })
      .then((res) => res.json())
      .then((result) => {
        if (mounted) {
          setMonitor(result);
          setLoading(false);
        }
      });

    return () => (mounted = false);
  }, [uptimeMonitor.id, uptimeMonitor.endpoint]);

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
        {!loading && (
          <UptimeDots
            timeseries={monitor.timeseries}
            regions={uptimeMonitor.regions}
            threshold={threshold}
          />
        )}
      </div>

      {!loading && (
        <OutagesOverlay
          open={overlayOpen}
          regions={uptimeMonitor.regions}
          handleClose={() => setOverlayOpen(false)}
          timeseries={monitor.timeseries}
          title={`All outages for ${uptimeMonitor.title}`}
          threshold={threshold}
        />
      )}
    </>
  );
};

UptimeMonitor.propTypes = {
  uptimeMonitor: PropTypes.object.isRequired,
  threshold: PropTypes.number,
};

export default UptimeMonitor;
