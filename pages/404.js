import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 – Page not found</title>
      </Head>
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center">
          <p className="c_h-heading c_h-heading--4xl mb-4">404</p>
          <h1 className="text-gray-700 mb-4">Oh no! Page not found :(</h1>
        </div>
      </div>
    </>
  );
}
