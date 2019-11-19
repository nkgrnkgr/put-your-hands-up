import React from 'react';
import { Icon, IconButton, Tooltip } from '@material-ui/core';

interface Props {
  title: string;
  url?: string;
  className: string;
  onClick?: () => void;
}

export const IconLink: React.FC<Props> = ({
  title,
  url = '',
  className,
  onClick,
}) => {
  return (
    <Tooltip title={title} aria-label={title}>
      <IconButton
        aria-label={title}
        href={url}
        target="_brank"
        rel="noopener"
        onClick={onClick}
      >
        <Icon className={className} />
      </IconButton>
    </Tooltip>
  );
};
