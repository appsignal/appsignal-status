import React from "react";
import PropTypes from "prop-types";

import OutagesOverlay from "../OutagesOverlay";
import UptimeDots from "../UptimeDots";

const UptimeMonitor = ({ hostname, uptimeMonitor }) => {
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [monitor, setMonitor] = React.useState([]);

  React.useEffect(() => {
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
        setMonitor(result);
        setLoading(false);
      });
  }, [hostname, uptimeMonitor.id]);

  if (loading) {
    return "Loading";
  } else {
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
              Monitoring from 4 locations
            </p>
          </div>
          <UptimeDots timeseries={monitor.timeseries} />
        </div>

        <OutagesOverlay
          open={overlayOpen}
          handleClose={() => setOverlayOpen(false)}
          outages={[]}
        />
      </>
    );
  }
};

UptimeMonitor.propTypes = {
  uptimeMonitor: PropTypes.object.isRequired,
  hostname: PropTypes.string.isRequired,
};

export default UptimeMonitor;
