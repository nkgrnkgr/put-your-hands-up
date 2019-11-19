import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { PageFooter } from './PageFooter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { display: 'flex', flexDirection: 'column', height: '100vh' },
    main: { flexGrow: 1 },
  }),
);

export const Page: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.main}>{children}</main>
      <PageFooter />
    </div>
  );
};
