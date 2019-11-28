import {
  Icon,
  IconButton,
  makeStyles,
  Snackbar,
  SnackbarContent,
  Theme,
} from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.secondary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export interface Props {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: 'success' | 'error' | 'info' | 'warning';
}

const Content: React.FC<Props> = props => {
  const classes = useStyles();
  const { className, message, onClose, variant } = props;

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <Icon className={clsx('far fa-times-circle', classes.icon)} />
        </IconButton>,
      ]}
    />
  );
};

export interface NotificationProps {
  isOpen: boolean;
  close: () => void;
  className?: string;
  message?: string;
  variant: 'success' | 'error' | 'info' | 'warning';
}

export const Notification: React.FC<NotificationProps> = props => {
  const { isOpen, close, className, message, variant } = props;

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      close();

      return;
    }
    close();
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Content
          className={className}
          message={message}
          variant={variant}
          onClose={handleClose}
        />
      </Snackbar>
    </>
  );
};
