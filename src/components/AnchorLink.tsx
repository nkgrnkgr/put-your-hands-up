import * as React from 'react';

export interface AnchorLinkProps {
  title: string;
  href?: string;
  className?: string;
  iconClassName?: string;
  isExternal?: boolean;
  handleOnClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  key?: number;
}

const anchorLink: React.SFC<AnchorLinkProps> = ({
  title,
  href,
  className = '',
  iconClassName = '',
  isExternal = false,
  handleOnClick = () => {},
  key = 0
}) => {
  const rel = isExternal ? 'noopener noreferrer' : '';
  const target = isExternal ? '_blank' : '';
  return (
    <a
      href={href}
      className={className}
      rel={rel}
      target={target}
      onClick={handleOnClick}
      key={key}
    >
      {iconClassName ? (
        <span className="icon is-small">
          <i className={iconClassName} />
        </span>
      ) : (
        ''
      )}
      <span>
        &nbsp;
        {title}
      </span>
    </a>
  );
};

export default anchorLink;
