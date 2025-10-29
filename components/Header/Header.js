import Link from "next/link";
import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex justify-between items-center py-3">
        <nav className="flex space-x-2 sm:space-x-4">
          <Link
            href="/"
            className="flex items-center no-underline font-semibold"
          >
            {title}
          </Link>
          <div className="h-6 w-px bg-gray-200 rounded" />
          <Link href="/" className="no-underline text-gray-700">
            Status
          </Link>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
