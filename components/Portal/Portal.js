import PropTypes from "prop-types";
import { useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, selector = "#portal" }) => {
  const [container] = useState(() => {
    if (typeof document === "undefined") return null;
    return document.querySelector(selector);
  });

  return container ? createPortal(children, container) : null;
};

Portal.propTypes = {
  children: PropTypes.object.isRequired,
  selector: PropTypes.string,
};

export default Portal;
