import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { Page } from '../../shared/components/Page';
import { PublicPageHeader } from '../../shared/components/PublicPageHeader';
import _under_construction from '../../../images/_under_construction.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '50px',
    },
    image: {
      display: 'block',
      margin: 'auto',
      width: '500px',
      maxWidth: '70%',
    },
    message: {
      margin: theme.spacing(3),
    },
  }),
);

export const HowToUsePage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Page>
        <PublicPageHeader />
        <div id="back-to-top-anchor" className={classes.app} />
        <Container>
          <Grid container justify="center" alignContent="center">
            <Grid item xs={12} sm={6}>
              <div>
                <img
                  src={_under_construction}
                  alt="under_construction"
                  className={classes.image}
                />
              </div>
              <Typography
                align="center"
                variant="h4"
                className={classes.message}
              >
                現在準備中です
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};
