import Link from 'next/link';
import { JSXElementConstructor, ReactChildren, ReactElement } from 'react';

export default function SocialsWrapper({
  children,
  link,
  show,
  width,
  height,
}: {
  children: ReactElement<JSX.Element>;
  link: string;
  show?: boolean;
  width?: any;
  height?: any;
}) {
  return (
    <>
      {(link || show) && (
        <a
          target="_blank"
          href={link}
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="self-center"
        >
          <main>{children}</main>
        </a>
      )}
    </>
  );
}
