import React from 'react';
import { LineFeedContent } from '../../shared/components/HTMLTextContent';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Paper, Typography, Divider } from '@material-ui/core';

interface Props {
  memo: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 800,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(1, 1),
    },
    title: {
      margin: theme.spacing(1),
    },
    contents: {
      margin: theme.spacing(1),
    },
  }),
);

export const Memo: React.FC<Props> = ({ memo }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Description
      </Typography>
      <Divider />
      <div className={classes.contents}>
        <LineFeedContent comment={memo} />
      </div>
    </Paper>
  );
};
