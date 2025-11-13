import "./main.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
