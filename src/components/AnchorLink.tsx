import * as React from 'react';

export interface AnchorLinkProps {
  title: string;
  href: string;
  className?: string;
  iconClassName?: string;
  isExternal?: boolean;
}

const anchorLink: React.SFC<AnchorLinkProps> = ({
  title,
  href,
  className = '',
  iconClassName = '',
  isExternal = false
}) => {
  const rel = isExternal ? 'noopener noreferrer' : '';
  const target = isExternal ? '_blank' : '';
  return (
    <a href={href} className={className} rel={rel} target={target}>
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
