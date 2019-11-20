import {
  Button,
  createStyles,
  Icon,
  makeStyles,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { IconLink } from '../../shared/components/IconLink';

interface Props {
  handleOnClickCloseButton: () => void;
  sholdTwitterShare: boolean;
  toggleTwitterShare: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    button: {
      margin: theme.spacing(1),
    },
    buttonIcon: {
      paddingRight: theme.spacing(1),
    },
  }),
);

export const NoteButtons: React.FC<Props> = ({
  handleOnClickCloseButton,
  sholdTwitterShare,
  toggleTwitterShare,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        className={classes.button}
        color="primary"
        startIcon={
          <Icon className={clsx('far fa-comments', classes.buttonIcon)} />
        }
        type="submit"
      >
        post
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        startIcon={<Icon className={clsx('far fa-times-circle')} />}
        onClick={handleOnClickCloseButton}
      >
        close
      </Button>
      <IconLink
        title="Twitterで共有"
        className="fab fa-twitter"
        color={sholdTwitterShare ? 'secondary' : 'default'}
        onClick={() => toggleTwitterShare()}
      />
    </div>
  );
};
