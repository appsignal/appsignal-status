import React from "react";
import PropTypes from "prop-types";

import Tippy from "@tippyjs/react";

import OutagesOverlay from "../OutagesOverlay";
import UptimeDots from "../UptimeDots";

import {
  timeseriesByDay as groupTimeseriesByDay,
  roundDecimal,
} from "../../utils";

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

export const calculateUptime = (timeseries, regions) => {
  const timeseriesByDay = groupTimeseriesByDay(timeseries, regions);
  const timeSeriesLast30Days = timeseriesByDay
    .slice(-30, timeseriesByDay.length - 1)
    .filter((item) => item.missingDataPoint === false);
  const minutesPerDay = 1440.0;

  const downtimePerRegion = [];

  regions.map((region) => {
    if (timeSeriesLast30Days.length == 0) {
      return 0;
    }

    const downtimeInMinutes = timeSeriesLast30Days.reduce((acc, item) => {
      return acc + item.values[region];
    }, 0);

    const uptimePercentage =
      100 -
      roundDecimal(
        (100.0 / (minutesPerDay * timeSeriesLast30Days.length)) *
          downtimeInMinutes
      );

    downtimePerRegion.push({
      region: region,
      minutes: downtimeInMinutes,
      percentage: uptimePercentage,
    });
  });

  return downtimePerRegion;
};

export const averageDowntimeOverRegions = (downtimePerRegion) => {
  if (Object.keys(downtimePerRegion).length == 0) {
    return 0;
  }

  const average =
    Object.values(downtimePerRegion).reduce((acc, item) => {
      return (acc += item.percentage);
    }, 0) / Object.keys(downtimePerRegion).length;
  return roundDecimal(average).toFixed(2);
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

  const calculatedUptime = calculateUptime(
    monitor.timeseries,
    uptimeMonitor.regions
  );

  return (
    <>
      <div className="px-6 py-5 space-y-3" data-testid="UptimeMonitor">
        <div className="sm:flex justify-between">
          <h2>
            <button
              className="c_h-heading focus:outline-none"
              onClick={() => setOverlayOpen(true)}
            >
              {uptimeMonitor.title}&nbsp;
              {!loading && (
                <Tippy
                  animation={false}
                  content={calculatedUptime.map((region) => (
                    <div key={region.region}>
                      {region.percentage}% in {region.region}
                    </div>
                  ))}
                >
                  <span className="text-xs">
                    ({averageDowntimeOverRegions(calculatedUptime)} % uptime)
                  </span>
                </Tippy>
              )}
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
