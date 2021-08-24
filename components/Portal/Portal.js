import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, selector = "#portal" }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

Portal.propTypes = {
  children: PropTypes.object.isRequired,
  selector: PropTypes.string,
};

export default Portal;
