'use client';

import React, { ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './breadbrumbs.module.css';

type TBreadCrumbProps = {
  homeElement?: ReactNode;
  listClasses?: string;
  invalidPaths?: Array<string>;
};

export default function Breadcrumbs({
  homeElement,
  listClasses,
  invalidPaths = [],
}: TBreadCrumbProps) {
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);
  if (homeElement == null && pathNames.length < 2) {
    return null;
  }
  const pathAsRegexp = invalidPaths.map(path => new RegExp(`^${path}$`));

  return (
    <nav aria-label="breadcrumbs">
      <ul className={styles.breadCrumbs}>
        {homeElement != null && (
          <li className={listClasses}>
            <Link className={styles.capitalize} href={'/'}>
              {homeElement}
            </Link>
          </li>
        )}

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          if (pathAsRegexp.some(regexp => regexp.test(href))) {
            return null;
          }
          return (
            <React.Fragment key={index}>
              <li>
                {index === pathNames.length - 1 ? (
                  <span className={styles.capitalize}>{link}</span>
                ) : (
                  <Link className={styles.capitalize} href={href}>
                    {link}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
