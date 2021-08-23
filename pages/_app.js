import PropTypes from "prop-types";
import "@appsignal/design-system";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
