import {
  Backdrop,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Paper,
  Theme,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      maxWidth: 900,
      width: '900px',
      padding: theme.spacing(1, 3),
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ModalBase: React.FC<Props> = ({ open, onClose, children }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      className={classes.root}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onClose={() => onClose()}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>{children}</Paper>
      </Fade>
    </Modal>
  );
};
