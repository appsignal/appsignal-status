import PropTypes from "prop-types";
import Portal from "../Portal/Portal";

const Overlay = ({ children, open }) => {
  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-90">{children}</div>
    </Portal>
  );
};

Overlay.propTypes = {
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Overlay;
