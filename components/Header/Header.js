import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex justify-between items-center py-3">
        <nav className="flex space-x-2 sm:space-x-4">
          <a
            className="flex items-center no-underline font-semibold"
            href="https://appsignal.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/assets/appsignal-logo.svg"
              alt="AppSignal Logo"
              height="20"
              width="108"
            />
          </a>
          <div className="h-6 w-px bg-gray-200 rounded" />
          <Link href="/">
            <a className="no-underline text-gray-700">Status</a>
          </Link>
        </nav>

        <a
          href="mailto:contact@appsignal.com"
          className="c-button c-button--gray c-button--xs sm:c-button--sm"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
};

export default Header;
