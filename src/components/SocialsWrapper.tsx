import Link from 'next/link';
import { JSXElementConstructor, ReactChildren, ReactElement } from 'react';

export default function SocialsWrapper({
  children,
  link,
}: {
  children: ReactElement<
    ReactChildren,
    string | JSXElementConstructor<unknown>
  >;
  link: string;
}) {
  return (
    <>
      {link && (
        <a target="_blank" href={link} rel="noopener noreferrer">
          <main>{children}</main>
        </a>
      )}
    </>
  );
}
