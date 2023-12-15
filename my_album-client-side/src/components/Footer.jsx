const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 shadow dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="#"
              className="mb-4 flex items-center space-x-3 rtl:space-x-reverse sm:mb-0"
            >
              <span className="transfom self-center whitespace-nowrap text-xl font-semibold text-gray-500 transition duration-100 hover:text-white dark:text-white">
                My Photo Album.
              </span>
            </a>
            <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
              <li>
                <a
                  href="#"
                  className="transfom me-4 transition duration-100 hover:text-white hover:underline md:me-6"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transfom me-4 transition duration-100 hover:text-white hover:underline md:me-6"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transfom me-4 transition duration-100 hover:text-white hover:underline md:me-6"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transfom transition duration-100 hover:text-white hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-500 dark:border-gray-700 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023
            <a
              href="#"
              className="transfom transition duration-100 hover:text-white hover:underline"
            >
              My Photo Album.™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
