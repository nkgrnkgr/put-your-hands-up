import {
  createStyles,
  makeStyles,
  Theme,
  Grid,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../shared/components/Page';
import { PublicPageHeader } from '../../shared/components/PublicPageHeader';
import cap2 from '../../../images/cap2.png';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '50px',
    },
    getStarts: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
    },
    cap: {
      maxWidth: '100%',
    },
    title: {
      fontFamily: 'Josefin Sans,sans-serif',
      fontWeight: 'lighter',
      color: theme.palette.primary.main,
      fontSize: '1.5em',
    },
    item: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export const LandingPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Page>
        <PublicPageHeader />
        <div id="back-to-top-anchor" className={classes.app} />
        <Container>
          <Grid container justify="center" alignContent="center">
            <Grid item xs={12} sm={6}>
              <div className={classes.getStarts}>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.item}
                >
                  Where feedback to
                  <br />
                  the speakers gather.
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  className={classes.item}
                >
                  <span className={classes.title}>PutYourHandsUp</span>は
                  <br />
                  勉強会参加者が大勢の前では手を上げづらい問題を解決するサービスです
                  <br />
                  匿名 / Twitter / Google
                  <br />
                  アカウントでログインし登壇者にフィードバックできます
                </Typography>
                <div className={clsx(classes.item, classes.buttonGroup)}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    GET STARTED
                  </Button>
                  <Button
                    color="default"
                    variant="outlined"
                    className={classes.button}
                  >
                    イベント管理
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={cap2} alt="cap" className={classes.cap} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};
