import PropTypes from "prop-types";
import { useState } from "react";

import BarChart from "../BarChart/BarChart";
import OutagesOverlay from "../OutagesOverlay/OutagesOverlay";

const outages = [
  {
    status: "error",
    region: "North America",
    from: "2021-08-15T08:06:00.000+02:00",
    till: "2021-08-15T08:11:00.000+02:00",
  },
  {
    status: "error",
    region: "South America",
    from: "2021-08-15T07:58:00.000+02:00",
    till: "2021-08-15T08:01:00.000+02:00",
  },
  {
    status: "error",
    region: "North America",
    from: "2021-08-07T23:56:00.000+02:00",
    till: "2021-08-08T00:02:00.000+02:00",
  },
];

const UptimeMonitor = ({ uptimeMonitor }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);

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
        <BarChart />
      </div>

      <OutagesOverlay
        open={overlayOpen}
        handleClose={() => setOverlayOpen(false)}
        outages={outages}
      />
    </>
  );
};

UptimeMonitor.propTypes = {
  uptimeMonitor: PropTypes.object.isRequired,
};

export default UptimeMonitor;
