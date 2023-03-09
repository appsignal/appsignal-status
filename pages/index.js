import PropTypes from "prop-types";
import Head from "next/head";

import Header from "../components/Header";
import CurrentStatus from "../components/CurrentStatus";
import Footer from "../components/Footer";
import StatusUpdates from "../components/StatusUpdates";
import UptimeMonitors from "../components/UptimeMonitors";

const App = ({ statusPage }) => {
  return (
    <>
      <Head>
        <title>{statusPage.title} Status</title>
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

  // Display uptime monitors in alphabetical order
  uptime_monitors.sort((a, b) => {
    return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
  });

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
