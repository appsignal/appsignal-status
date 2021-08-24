import PropTypes from "prop-types";

import StatusIcon from "../StatusIcon/StatusIcon";

const StatusUpdate = ({ status, title, description, time }) => {
  return (
    <div className="flex bg-white shadow-sm rounded py-5 px-6">
      <div className="mr-4 my-0.5">
        <StatusIcon status={status} />
      </div>
      <div className="">
        <h3 className="c_h-heading mb-1">{title}</h3>
        {description && <p className="text-gray-700">{description}</p>}
        <p className="text-gray-600 text-ms mt-2">{time}</p>
      </div>
    </div>
  );
};

StatusUpdate.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  time: PropTypes.string.isRequired,
};

export default StatusUpdate;
