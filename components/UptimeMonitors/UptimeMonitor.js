import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

import BarChart from "../BarChart";
import OutagesOverlay from "../OutagesOverlay";
import UptimeDot from "../UptimeDot";

const UptimeMonitor = ({ hostname, uptimeMonitor }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
          {monitor.timeseries.slice(0, 10).map((timeserie) => (
            <UptimeDot timeserie={timeserie} key={timeserie.timestamp} />
          ))}
          <BarChart />
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
