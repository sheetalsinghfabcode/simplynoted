import {Link, useLocation} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {useStateContext} from '~/context/StateContext';

const Breadcrumbs = ({additionalBreadcrumbs}) => {
  const location = useLocation();
  const [previousPage, setPreviousPage] = useState(null);
  const pathnames = location.pathname.split('/').filter((x) => x);

  const {
    setShowSelectAddress,
    setProductShow,
    setIsCardTypeSelectionPage,
    setWalletPlan,
    setWalletPayment,
    setWalletPurchase
  } = useStateContext();

  useEffect(() => {
    setIsCardTypeSelectionPage(true);
    setProductShow(true);
    setWalletPlan(false);
    setWalletPayment(false);
    setWalletPurchase(false);
  }, [location.pathname]);

  useEffect(() => {
    const prevPage = localStorage.getItem('previousPage');
    if (prevPage && prevPage !== location.pathname) {
      setPreviousPage(prevPage);
    }
    localStorage.setItem('previousPage', location.pathname);
  }, [location.pathname]);

  let ab = ['collections', 'pages','policies'];

  return (
    <div className="breadcrumb inline-block text-[#010101] capitalize font-medium ">
      <nav
        className="flex px-2 sm:px-5 py-3  border  border-gray-200 rounded-lg bg-gray-50 "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex sm:whitespace-nowrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-xs sm:text-sm font-medium  hover:text-blue-600 "
            >
              <svg
                className="w-3 h-3 mb-[2px] me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          {previousPage &&
            !ab.includes(pathnames[0]) &&
            pathnames.length > 1 && (
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 block w-3 h-3 mx-1  "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to={previousPage}
                    className="ms-1 text-xs sm:text-sm font-medium  hover:text-blue-600 md:ms-2 "
                  >
                    {previousPage.split('/').pop()}
                  </Link>
                </div>
              </li>
            )}
          {pathnames.map((name, index) => {
            let breadcrumbPath = `/${pathnames.slice(0, index + 1).join('/')}`;
            if (['collections', 'products', 'pages', 'policies'].includes(name))
              return null; // Skip collections and products
            const isLast = index === pathnames.length - 1;

            return (
              <li
                onClick={() => {
                  setWalletPlan(false)
                  setIsCardTypeSelectionPage(true)
                  setProductShow(true);
                  setShowSelectAddress(false);
                }}
                key={breadcrumbPath}
                className="inline-flex items-center"
              >
                <svg
                  className="rtl:rotate-180 mb-[1px]  w-3 h-3 mx-1 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {isLast && additionalBreadcrumbs ? (
                  <Link
                    to={breadcrumbPath}
                    className="inline-flex sm:whitespace-nowrap items-center text-xs sm:text-sm font-medium  hover:text-blue-600 "
                  >
                    {name}
                  </Link>
                ) : (
                  <span className="ms-1 text-xs sm:text-sm font-normal  md:ms-2 ">
                    {name}
                  </span>
                )}
              </li>
            );
          })}
          {additionalBreadcrumbs &&
            additionalBreadcrumbs.length > 0 &&
            additionalBreadcrumbs.map((breadcrumb, index) => (
              <>
                <svg
                  className="rtl:rotate-180  w-3 h-3 mx-1 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <li key={index} className="inline-flex items-center">
                  <span className="ms-1 text-xs sm:text-sm font-medium">
                    {breadcrumb}
                  </span>
                </li>
              </>
            ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
