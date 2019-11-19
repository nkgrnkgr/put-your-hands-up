import {
  createStyles,
  Fab,
  Hidden,
  Icon,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

interface Props {
  handleOnClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(1),
    },
    fabIcon: {
      padding: theme.spacing(1),
    },
  }),
);

export const ModalFab: React.FC<Props> = ({ handleOnClick }) => {
  const classes = useStyles();

  return (
    <Hidden smUp>
      <Fab color="primary" onClick={handleOnClick} className={classes.fab}>
        <Icon className={clsx('far fa-comments', classes.fabIcon)} />
      </Fab>
    </Hidden>
  );
};
