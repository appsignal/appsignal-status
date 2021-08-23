import PropTypes from "prop-types"
import StatusUpdate from "./StatusUpdate"

const StatusUpdates = ({ statusUpdates }) => {
  return (
    <section className="mt-20 mb-16">
      <a name="status-updates" id="status-updates" />
      <div className="container">
        <h2 className="c_h-heading c_h-heading--2xl mb-8 text-center">
          Status updates
        </h2>
        <div className="max-w-lg mx-auto space-y-4">
          <StatusUpdate
            type="success"
            title="All systems are back up!"
            description=""
            time="15th Aug 08:11 CET"
          />
          <StatusUpdate
            type="error"
            title="We’re experiencing some issues"
            description="Here’s a message with some context."
            time="15th Aug 07:53 CET"
          />
          <StatusUpdate
            type="warning"
            title="Planned maintainance on August 15th between 02:00pm and 03:00pm"
            description="Here’s a message with some context."
            time="11th Aug 15:11 CET"
          />
        </div>
      </div>
    </section>
  )
}

StatusUpdates.propTypes = {
  statusUpdates: PropTypes.array.isRequired,
}


export default StatusUpdates
