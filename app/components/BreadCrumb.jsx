import { Link, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
const BreadCrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path !== '');

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb w-[35%]">
        {paths.map((path, index) => {
          const url = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;

          return (
            <li key={index} className={`breadcrumb-item${isLast ? ' active' : ''}`}>
              {isLast ? (
                path
              ) : (
                <Link to={url}>{path}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
