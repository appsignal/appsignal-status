import Head from "next/head";

import Header from "../components/Header/Header"
import CurrentStatus from "../components/CurrentStatus/CurrentStatus"
import Footer from "../components/Footer/Footer"
import StatusUpdates from "../components/StatusUpdates/StatusUpdates"
import UptimeMonitors from "../components/UptimeMonitors/UptimeMonitors"

const App = ({ statusPage }) => {
  return (
    <>
      <Head>
        <title>{statusPage.title} Status</title>
      </Head>
      <Header/>
      <main>
        <CurrentStatus status={statusPage.status} />
        <UptimeMonitors uptimeMonitors={statusPage.uptime_monitors} />
        <StatusUpdates statusUpdates={[]} />
      </main>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { headers } = req
  const hostname = headers['cdn-host'] || "status.appsignal-status.online"
  const result = await fetch(`https://api.appsignal-status.online/status_pages/${Buffer.from(hostname).toString('base64')}.json`)

  if (!result.ok) {
    return {
      notFound: true
    }
  }

  const data = await result.json()
  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { statusPage: data }
  }
}

export default App
