import React from 'react';
import { Icon, IconButton, Tooltip, PropTypes } from '@material-ui/core';

interface Props {
  title: string;
  url?: string;
  className: string;
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
  onClick?: () => void;
}

export const IconLink: React.FC<Props> = ({
  title,
  url = '',
  className,
  color,
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
        <Icon className={className} color={color} />
      </IconButton>
    </Tooltip>
  );
};
