import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import pyhuloge_pink from '../../../images/pyhuloge_pink.png';
import _top from '../../../images/_top.svg';
import { Page } from '../../shared/components/Page';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '50px',
    },
    content: {
      marginBottom: theme.spacing(5),
    },
    title: {
      fontWeight: 'bold',
    },
    subTitle: {},
    centerWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    imageTop: {
      width: '100%',
    },
    logo: {
      width: '32px',
    },
    button: {
      textAlign: 'center',
      margin: theme.spacing(2),
    },
    page2: {
      background: '#fff',
    },
  }),
);

export const LandingPage: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Page>
        <Container>
          <div id="back-to-top-anchor" className={classes.app} />
          <Grid className={classes.content} container justify="center">
            <Grid item xs>
              <Typography className={classes.title} align="center" variant="h4">
                登壇者にフィードバックしよう
              </Typography>
            </Grid>
          </Grid>
          <Grid
            className={classes.content}
            container
            justify="center"
            alignContent="center"
          >
            <Grid item xs={12} sm={6}>
              <div className={classes.centerWrapper}>
                <img src={_top} className={classes.imageTop} />
              </div>
            </Grid>
          </Grid>
          <Grid container justify="center" className={classes.content}>
            <Grid item xs>
              <Typography className={classes.title} align="center" variant="h4">
                <img src={pyhuloge_pink} className={classes.logo} />
                <span style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                  Put Your Hands Up
                </span>
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.content} container justify="center">
            <Grid item xs>
              <Typography
                className={classes.subTitle}
                align="center"
                variant="body1"
              >
                <span style={{ fontWeight: 'bold' }}> Put Your Hans Up </span>は
                <br />
                誰でも気軽に
                <br />
                <span style={{ fontWeight: 'bold' }}>
                  勉強会の登壇者にフィードバック
                </span>
                ができる
                <br />
                グループチャットライクなサービスです
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignContent="center"
            className={classes.content}
          >
            <Grid item xs={12} sm={6}>
              <div className={classes.centerWrapper}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push({ pathname: '/dashbord', state: 'dashboard' })
                  }
                >
                  GET STARTED
                </Button>
              </div>
              <div className={classes.centerWrapper}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="default"
                  onClick={() =>
                    history.push({ pathname: '/organizer', state: 'organizer' })
                  }
                >
                  イベント管理者向け
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};
