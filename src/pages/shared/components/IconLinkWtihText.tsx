import React from 'react';
import { Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface Props {
  title: string;
  url?: string;
  className: string;
  onClick?: () => void;
}

const useStyles = makeStyles({
  button: {
    color: '#9E9E9E',
    textTransform: 'none',
  },
});

export const IconLinkWithText: React.FC<Props> = ({
  title,
  url = '',
  className,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        aria-label={title}
        href={url}
        target="_brank"
        rel="noopener"
        onClick={onClick}
        startIcon={<Icon className={className} />}
        className={classes.button}
        size="small"
      >
        {title}
      </Button>
    </>
  );
};
