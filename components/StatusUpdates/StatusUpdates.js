import PropTypes from "prop-types";
import StatusUpdate from "./StatusUpdate";

const statusUpdates = [
  {
    status: "success",
    title: "All systems are back up!",
    description: "",
    time: "15th Aug 08:11 CET",
  },
  {
    status: "error",
    title: "We’re experiencing some issues",
    description: "Here’s a message with some context.",
    time: "15th Aug 07:53 CET",
  },
  {
    status: "warning",
    title: "Planned maintainance on August 15th between 02:00pm and 03:00pm",
    description: "Here’s a message with some context.",
    time: "11th Aug 15:11 CET",
  },
];

const StatusUpdates = () => {
  return (
    <section className="mt-20 mb-16">
      <div className="container">
        <a name="status-updates" id="status-updates">
          <h2 className="c_h-heading c_h-heading--2xl mb-8 text-center">
            Status updates
          </h2>
        </a>
        <div className="max-w-lg mx-auto space-y-4">
          {statusUpdates.map((update, index) => (
            <StatusUpdate
              key={index}
              status={update.status}
              title={update.title}
              description={update.description}
              time={update.time}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

StatusUpdates.propTypes = {
  statusUpdates: PropTypes.array.isRequired,
};

export default StatusUpdates;
