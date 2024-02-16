import { Link, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const location = useLocation();
  const [previousPage, setPreviousPage] = useState(null);
  const pathnames = location.pathname.split('/').filter((x) => x);

  useEffect(() => {
    const prevPage = localStorage.getItem('previousPage');
    if (prevPage && prevPage !== location.pathname) {
      setPreviousPage(prevPage);
    }
    localStorage.setItem('previousPage', location.pathname);
  }, [location.pathname]);

  return (
    <div className='breadcrumb'>
    <nav className="flex px-5 py-3 text-gray-700 border  border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
          </Link>
        </li>
        {previousPage && (
          <li>
            <div className="flex items-center">
              <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <Link to="/collections/best-sellers" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{previousPage.split('/').pop()}</Link>
            </div>
          </li>
        )}
        {pathnames.map((name, index) => {
          let breadcrumbPath = `/${pathnames.slice(0, index + 1).join('/')}`;
          if (['collections', 'products','pages','policies'].includes(name)) return null; // Skip collections and products
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={breadcrumbPath} className="flex items-center">
              <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{name}</span>
            </li>
          ) : (
            <li key={breadcrumbPath} className="inline-flex items-center">
              <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <Link to={breadcrumbPath} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">{name}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
    </div>
  );
};

export default Breadcrumbs;
