import React from 'react';
import {
  Backdrop,
  createStyles,
  makeStyles,
  Modal,
  Theme,
  Fade,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
  okClickHandler: Function;
  cancelClickHandler?: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      maxWidth: 800,
      padding: theme.spacing(1, 3),
      margin: theme.spacing(1),
    },
    message: {
      margin: theme.spacing(3),
    },
    buttons: {
      display: 'flex',
      alignItems: 'cetenter',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(3),
    },
  }),
);

export const ConfirmDialog: React.FC<ConfirmDialogProps> = props => {
  const { open, onClose, okClickHandler, message, cancelClickHandler } = props;
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
      onClose={onClose}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.message}
            align="center"
            variant="body1"
          >
            {message}
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => okClickHandler()}
            >
              OK
            </Button>
            {cancelClickHandler && (
              <Button
                className={classes.button}
                variant="outlined"
                color="default"
                onClick={() => cancelClickHandler()}
              >
                Cancel
              </Button>
            )}
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};
