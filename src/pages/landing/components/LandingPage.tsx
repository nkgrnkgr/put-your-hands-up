import {
  createStyles,
  makeStyles,
  Theme,
  Grid,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { Page } from '../../shared/components/Page';
import { PublicPageHeader } from '../../shared/components/PublicPageHeader';
import cap2 from '../../../images/cap2.png';
import sc1 from '../../../images/sc1.png';
import sc2 from '../../../images/sc2.png';
import sc3 from '../../../images/sc3.png';
import sc4 from '../../../images/sc4.png';
import sc5 from '../../../images/sc5.png';
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
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
    },
    secondSection: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      backgroundColor: '#fff',
    },
    contents: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    content: {
      margin: theme.spacing(3),
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    image: {
      height: '30px',
    },
  }),
);

export const LandingPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const history = useHistory();

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
                    onClick={() => history.push('/dashboard')}
                  >
                    GET STARTED
                  </Button>
                  <Button
                    color="default"
                    variant="outlined"
                    className={classes.button}
                    onClick={() => history.push('/organizer')}
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
        <div className={classes.secondSection}>
          <Container>
            <Grid
              className={classes.contents}
              container
              justify="center"
              alignContent="center"
            >
              <Grid item xs={12}>
                <Container className={classes.contents}>
                  <Typography align="center" variant="h4">
                    Features
                  </Typography>
                </Container>
              </Grid>
            </Grid>
            <Grid
              className={classes.contents}
              container
              justify="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Card className={classes.content}>
                  <CardMedia
                    className={classes.media}
                    image={sc1}
                    title="screen"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.content}>
                  <Typography variant="h5" className={classes.item}>
                    リアルタイムな情報共有
                  </Typography>
                  <Typography variant="body1">
                    投稿は同じページを見ている全てのユーザーに
                    <b>リアルタイム</b>に共有されます。
                    <br />
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid
              className={classes.contents}
              container
              justify="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Card className={classes.content}>
                  <CardMedia
                    className={classes.media}
                    image={sc3}
                    title="screen"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.content}>
                  <Typography variant="h5" className={classes.item}>
                    参加者どうしのコミュニケーション
                  </Typography>
                  <Typography variant="body1">
                    返信やいいね機能を使って、
                    <br />
                    登壇者向けだけでなく参加者どうしもコミュニケーションできます。
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid
              className={classes.contents}
              container
              justify="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Card className={classes.content}>
                  <CardMedia
                    className={classes.media}
                    image={sc2}
                    title="screen"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.content}>
                  <Typography variant="h5" className={classes.item}>
                    Twitterへの投稿
                  </Typography>
                  <Typography variant="body1">
                    参加者はTwitterと連携することで
                    <br />
                    イベントページで指定されたハッシュタグ付きで投稿できます。
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid
              className={classes.contents}
              container
              justify="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Card className={classes.content}>
                  <CardMedia
                    className={classes.media}
                    image={sc4}
                    title="screen"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.content}>
                  <Typography variant="h5" className={classes.item}>
                    質問タグの活用
                  </Typography>
                  <Typography variant="body1">
                    質問タグをつけて投稿することで、あとで登壇者への質問時間にタグをつけた投稿のみを抽出して質問できます
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid
              className={classes.contents}
              container
              justify="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Card className={classes.content}>
                  <CardMedia
                    className={classes.media}
                    image={sc5}
                    title="screen"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.content}>
                  <Typography variant="h5" className={classes.item}>
                    Connpass連携
                  </Typography>
                  <Typography variant="body1">
                    ConnpassのURLから<b>１クリック</b>
                    で簡単にイベントの作成ができます
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className={clsx(classes.item, classes.buttonGroup)}>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => history.push('/dashboard')}
          >
            GET STARTED
          </Button>
          <Button
            color="default"
            variant="outlined"
            className={classes.button}
            onClick={() => history.push('/organizer')}
          >
            イベント管理
          </Button>
        </div>
      </Page>
    </>
  );
};
