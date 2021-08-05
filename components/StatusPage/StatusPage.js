import UptimeMonitor from "../UptimeMonitor/UptimeMonitor"

const StatusPage = ({ statusPage }) => {
  return <div className="bg-gray-100 min-h-screen">
    <section className="py-24 xl:py-32 space-y-24">
      <header className="container md:text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className="
              c_h-heading c_h-heading--lg
              sm:c_h-heading--xl
              lg:c_h-heading--2xl
              text-gray-700
              dark:text-gray-200
              inline-flex
              items-center
              mb-3
              lg:mb-4
            "
          >
            AppSignal Status page
          </h1>
          <h2
            className="
              c_h-heading c_h-heading--5xl
              sm:c_h-heading--6xl
              lg:c_h-heading--7xl
              text-gray-800
              dark:text-white
            "
          >
            {statusPage.title}
          </h2>
        </div>
        <p
          className="
            max-w-3xl
            mx-auto
            text-xl
            lg:text-2xl
            text-gray-700
            dark:text-gray-200
            mt-4
            lg:mt-6
          "
        >
          <span className="block"
          >{statusPage.description}</span>
        </p>
      </header>
    </section>
    <section className="container">
      <table className="c-table border bg-white">
        <tbody>
          {statusPage.uptime_monitors.map(m => <UptimeMonitor key={m.url} uptimeMonitor={m} />)}
        </tbody>
      </table>
    </section>
  </div>
}

export default StatusPage
