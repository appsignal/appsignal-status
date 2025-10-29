import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-gray-100 text-gray-800">
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
