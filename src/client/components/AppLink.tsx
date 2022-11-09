import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

type AppLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  url: string;
  children?: React.ReactNode;
  external?: boolean;
  download?: string | boolean;
  [key: string]: any;
};

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

const AppLink: React.FC<AppLinkProps> = ({ children, url = '', external, ref, ...rest }) => {
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = '_blank';
    rest.rel = 'noopener noreferrer';
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
};

export default AppLink;
