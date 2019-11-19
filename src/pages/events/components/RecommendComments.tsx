import React from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { recommendComments } from '../../../models/Note';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(6),
      marginBottom: theme.spacing(2),
    },
    button: {
      marginRight: theme.spacing(0.5),
    },
  }),
);

interface Props {
  handleOnClick: (comment: string) => void;
}

export const RecommendComments: React.FC<Props> = ({ handleOnClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {recommendComments.map((comment, index) => (
        <Button
          className={classes.button}
          key={index}
          variant="outlined"
          size="small"
          onClick={() => handleOnClick(comment)}
        >
          {comment}
        </Button>
      ))}
    </div>
  );
};
