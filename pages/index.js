import StatusPage from "../components/StatusPage/StatusPage"

const App = ({ statusPage }) => {
  return <StatusPage statusPage={statusPage} />
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
