import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

const Markdown = ({ children, className = "", ...props }) => (
  <div className={`prose [&_*]:text-gray-800 ${className}`} {...props}>
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
);

Markdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Markdown;
