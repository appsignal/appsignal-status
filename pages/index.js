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
        <link
          rel="icon"
          href="/assets/favicon/favicon.svg"
          type="image/svg+xml"
        />
        <link
          rel="mask-icon"
          href="/assets/favicon/favicon.svg"
          color="#29A575"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/assets/favicon/manifest.webmanifest" />
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
  const hostname = headers["cdn-host"] || "staging.appsignal-status.online";
  const result = await fetch(
    `https://api.appsignal-status.online/status_pages/${Buffer.from(
      hostname
    ).toString("base64")}.json`
  );

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

  return {
    props: { statusPage: data },
  };
}

App.propTypes = {
  statusPage: PropTypes.object,
};

export default App;
