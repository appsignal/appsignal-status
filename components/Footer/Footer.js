import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-16 mb-12">
      <div className="container">
        <p className="flex items-center justify-center text-sm text-gray-700">
          <span>Get your own status page at</span>
          <a
            className="flex items-center ml-2"
            href="https://appsignal.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/assets/appsignal-logo.svg"
              alt="AppSignal Logo"
              height={16}
              width={86}
            />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
