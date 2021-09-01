import PropTypes from "prop-types";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import StatusIcon from "../StatusIcon/StatusIcon";

const StatusUpdate = ({ update }) => {
  return (
    <div
      className="flex bg-white shadow-sm rounded py-5 px-6"
      data-testid="statusUpdate"
    >
      <div className="mr-4 my-0.5">
        <StatusIcon status={update.state} />
      </div>
      <div className="">
        <h3 className="c_h-heading mb-1">{update.title}</h3>
        {update.description && (
          <p className="text-gray-700">{update.description}</p>
        )}
        <p className="text-gray-600 text-ms mt-2">
          {dayjs(update.time).format("MMM. Do H:m")}
        </p>
      </div>
    </div>
  );
};

StatusUpdate.propTypes = {
  update: PropTypes.shape({
    state: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatusUpdate;
