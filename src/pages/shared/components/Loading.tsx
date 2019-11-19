import React, { FC } from 'react';
import {
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

interface Props {
  color?: 'primary' | 'secondary' | 'inherit';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const Loading: FC<Props> = ({ color = 'secondary' }) => {
  const classes = useStyles();

  return <CircularProgress className={classes.progress} color={color} />;
};

export default Loading;
