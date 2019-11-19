import { createStyles, Icon, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface Props {
  isLiked: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: '0.9em',
    },
    iconColorPink: {
      color: '#ff3860',
    },
  }),
);

export const HeartIcon: React.FC<Props> = ({ isLiked }) => {
  const classes = useStyles();

  return isLiked ? (
    <Icon
      className={clsx('fas fa-heart', classes.icon, classes.iconColorPink)}
    />
  ) : (
    <Icon className={clsx('far fa-heart', classes.icon)} />
  );
};
