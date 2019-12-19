import React from 'react';
import empty from '../../../images/_empty.svg';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      margin: theme.spacing(2),
      height: '100px',
    },
    image: {
      width: '500px',
      maxWidth: '70%',
    },
    button: {
      margin: theme.spacing(4),
    },
  }),
);

interface Props {
  message: string;
  onClickButton: () => void;
}

export const EmptyContents: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img src={empty} alt="empty" className={classes.image} />
      </div>
      <div>
        <Typography variant="h5">{props.message}</Typography>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => props.onClickButton()}
        >
          投稿する
        </Button>
      </div>
    </div>
  );
};
