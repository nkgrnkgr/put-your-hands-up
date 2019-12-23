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
    contentsContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      backgroundColor: '#fff',
    },
    title: {
      fontFamily: 'Josefin Sans,sans-serif',
      fontWeight: 'lighter',
    },
    subTitle: {
      marginBottom: theme.spacing(4),
    },
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
      margin: theme.spacing(1),
    },
    section: {
      background: '#fff',
      padding: theme.spacing(1),
    },
  }),
);

export const LandingPage: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Page>
        <div id="back-to-top-anchor" className={classes.app} />
        <Grid
          className={classes.content}
          container
          justify="center"
          alignContent="center"
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.centerWrapper}>
              <img src={_top} alt="toplogo" className={classes.imageTop} />
            </div>
          </Grid>
        </Grid>
        <Typography className={classes.title} align="center" variant="h4">
          <img src={pyhuloge_pink} alt="toplogo" className={classes.logo} />
          <span style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
            PutYourHandsUp
          </span>
        </Typography>
        <Typography className={classes.subTitle} align="center" variant="body1">
          Where feedback to the speakers gather.
        </Typography>
        <Grid container className={classes.content}>
          <Grid item xs={12}>
            <div className={classes.centerWrapper}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => history.push({ pathname: '/dashboard' })}
              >
                GET STARTED
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                color="default"
                onClick={() => history.push({ pathname: '/organizer' })}
              >
                イベント管理
              </Button>
            </div>
          </Grid>
        </Grid>
        <div className={classes.section}>
          <Container maxWidth="sm" className={classes.contentsContainer}>
            <div className={classes.content}>
              <Typography
                align="center"
                className={classes.subTitle}
                variant="h5"
              >
                PutYourHandsUpとは
              </Typography>
              <Typography className={classes.subTitle} variant="body1">
                勉強会参加者が恥ずかしくて手を上げづらい問題を解決するサービスです。匿名/Twitter/Google
                アカウントで投稿することができます。
              </Typography>
            </div>
            <div className={classes.content}>
              <Typography
                align="center"
                className={classes.subTitle}
                variant="h5"
              >
                気軽に登壇者にフィードバックしよう
              </Typography>
              <Typography className={classes.subTitle} variant="body1">
                勇気を持って登壇してくれた発表者に感想や質問を送りましょう。登壇者はどんなフィードバックであれ喜んでくれるはずです！
                どんな馬鹿げた質問でも聞いてくれ良いと思ってくくれているはずです。
              </Typography>
            </div>
            <div className={classes.content}>
              <Typography
                align="center"
                className={classes.subTitle}
                variant="h5"
              >
                Twitterと連携
              </Typography>
              <Typography className={classes.subTitle} variant="body1">
                Twitterへの同時投稿も可能です。今までTwitterにハッシュタグ付きで投稿していたように、投稿することができます。
              </Typography>
            </div>
            <div className={classes.content}>
              <Typography
                align="center"
                className={classes.subTitle}
                variant="h5"
              >
                Connpassと連携
              </Typography>
              <Typography className={classes.subTitle} variant="body1">
                イベントページはConnpassのイベントURLから簡単に作成できます。
              </Typography>
            </div>
          </Container>
        </div>
      </Page>
    </>
  );
};
