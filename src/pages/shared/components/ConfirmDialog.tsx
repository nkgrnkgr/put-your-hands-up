import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { ModalBase } from './ModalBase';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
  okClickHandler: (value?: any) => void;
  cancelClickHandler: (value?: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    <ModalBase open={open} onClose={onClose}>
      <>
        <Typography className={classes.message} align="center" variant="body1">
          {message}
        </Typography>
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              okClickHandler();
              onClose();
            }}
          >
            OK
          </Button>
          {cancelClickHandler && (
            <Button
              className={classes.button}
              variant="outlined"
              color="default"
              onClick={() => {
                cancelClickHandler();
                onClose();
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </>
    </ModalBase>
  );
};
