import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Overlay from "../Overlay/Overlay";
import OutagesList from "./OutagesList";

const OutagesOverlay = ({ outages, open, handleClose }) => {
  return (
    <Overlay open={open}>
      <div className="flex justify-end">
        <div className="w-full max-w-2xl h-screen bg-gray-100">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
            <h2 className="c_h-heading">All outages of AppSignal Homepage</h2>
            <button onClick={handleClose} className="focus:outline-none">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="p-6">
            <OutagesList outages={outages} />
          </div>
        </div>
      </div>
    </Overlay>
  );
};

OutagesOverlay.propTypes = {
  outages: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default OutagesOverlay;