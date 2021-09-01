import PropTypes from "prop-types";
import StatusUpdate from "../StatusUpdate";

const StatusUpdates = ({ updates }) => {
  return (
    <section className="mt-20 mb-16">
      <div className="container">
        <a name="status-updates" id="status-updates" className="no-underline">
          <h2 className="c_h-heading c_h-heading--2xl mb-8 text-center">
            Status updates
          </h2>
        </a>
        <div className="max-w-lg mx-auto space-y-4">
          {updates.length === 0 && (
            <p className="text-center">No updates yet</p>
          )}
          {updates.length > 0 &&
            updates.map((update) => (
              <StatusUpdate key={update.id} update={update} />
            ))}
        </div>
      </div>
    </section>
  );
};

StatusUpdates.propTypes = {
  updates: PropTypes.array.isRequired,
};

export default StatusUpdates;
