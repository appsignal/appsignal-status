import { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import fetch from "cross-fetch";

import Header from "../components/Header/Header";
import CurrentStatus from "../components/CurrentStatus/CurrentStatus";
import Footer from "../components/Footer/Footer";
import StatusUpdates from "../components/StatusUpdates/StatusUpdates";
import UptimeMonitors from "../components/UptimeMonitors/UptimeMonitors";

export const POLL_INTERVAL_MS = 15 * 60 * 1000;

const App = ({ statusPage }) => {
  const { asPath, replace } = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      // A client-side navigation reruns getServerSideProps without reloading.
      replace(asPath, undefined, { scroll: false }).catch((error) => {
        console.error("Failed to refresh status page", error);
      });
    }, POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [asPath, replace]);

  return (
    <>
      <Head>
        {/* Use interpolation to avoid creating multiple text nodes in the title tag */}
        <title>{`${statusPage.title} Status`}</title>
      </Head>
      <Header title={statusPage.title} />
      <main>
        <CurrentStatus statusPage={statusPage} />
        <UptimeMonitors statusPage={statusPage} />
        <StatusUpdates updates={statusPage.updates} />
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ req }) {
  const { headers } = req;
  const hostname = headers["cdn-host"] || process.env.DEFAULT_HOSTNAME;
  const base64Hostname = Buffer.from(hostname).toString("base64");
  const baseEndpoint = `https://${process.env.API_ENDPOINT}/status_pages/${base64Hostname}`;
  const result = await fetch(`${baseEndpoint}.json`);

  if (!result.ok) {
    return {
      notFound: true,
    };
  }

  const data = await result.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // Inject the endpoint for the metrics into the uptime monitors from
  // the API request, makes fetching in the front-end easier
  const { uptime_monitors, ...rest } = data;
  const uptimeMonitorsWithEndpoint = uptime_monitors.map((uptimeMonitor) => {
    return {
      ...uptimeMonitor,
      endpoint: `${baseEndpoint}/monitors/${uptimeMonitor.id}.json`,
    };
  });

  return {
    props: {
      statusPage: {
        ...rest,
        uptime_monitors: uptimeMonitorsWithEndpoint,
      },
    },
  };
}

App.propTypes = {
  statusPage: PropTypes.object,
};

export default App;
