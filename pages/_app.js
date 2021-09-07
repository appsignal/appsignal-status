import PropTypes from "prop-types";
import "@appsignal/design-system";
import MockDate from "mockdate";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
  // If MSW is active we want to stop the time at 25 of August for the stored
  // mocks to work
  MockDate.set("2021-08-25");
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
