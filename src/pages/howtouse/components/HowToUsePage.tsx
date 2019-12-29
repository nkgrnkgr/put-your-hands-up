import {
  Container,
  createStyles,
  makeStyles,
  Grid,
  Theme,
  Typography,
  Divider,
  Card,
  CardMedia,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../shared/components/Page';
import { PublicPageHeader } from '../../shared/components/PublicPageHeader';
import clsx from 'clsx';
import h1 from '../../../images/h1.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '50px',
    },
    message: {
      margin: theme.spacing(2),
    },
    tableOfContents: {
      padding: theme.spacing(1),
      backgroundColor: '#f9f9f9',
    },
    title: {
      margin: theme.spacing(1),
    },
    content: {
      margin: theme.spacing(3),
    },
    item: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
);

const InnerLink: React.FC<{ title: string }> = ({ title }) => (
  <a href={`/howtouse#${title}`}>{title}</a>
);

const AnchorTitle: React.FC<{ title: string }> = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography variant="h5" id={title} className={classes.item}>
      {title}
    </Typography>
  );
};

interface Contents {
  title: string;
  media: string;
  body: JSX.Element;
}

const contentsOfUser: Contents[] = [
  {
    title: 'イベントに参加する',
    media: h1,
    body: (
      <ul>
        <li>
          初めて参加するイベントの場合は、イベント管理者からイベントページのURLを連携してもらってください
        </li>
        <li>
          <Link to="/dashboard">ダッシュボード</Link>
          で今まで参加したイベントページにアクセスできます。
        </li>
      </ul>
    ),
  },

  // 'コメントを投稿する',
  // '返信する',
  // 'コメントをTwitterに同時投稿する',
  // '匿名ユーザーで名前/アイコンを変更する',
  // 'ユーザーを削除する',
];

const contentsOfOrganizer = [
  'イベントページの作成/編集をする',
  'イベントページの作成/編集をする',
  '参加者にイベントページを案内する',
  '登壇者への質問を抽出する',
];

export const HowToUsePage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Page>
        <PublicPageHeader />
        <div id="back-to-top-anchor" className={classes.app} />
        <Container>
          <Typography variant="h4" className={classes.message}>
            How To Use
          </Typography>
          <Typography
            variant="body1"
            className={clsx(classes.message, classes.tableOfContents)}
          >
            <Typography variant="h5" className={classes.message}>
              参加者向けの機能
            </Typography>
            <ul>
              {contentsOfUser.map((content, index) => (
                <li key={index}>
                  <InnerLink title={content.title} />
                </li>
              ))}
            </ul>
          </Typography>
          <Typography
            variant="body1"
            className={clsx(classes.message, classes.tableOfContents)}
          >
            <Typography variant="h5" className={classes.message}>
              イベント管理者向けの機能
            </Typography>
            <ul>
              {contentsOfOrganizer.map((content, index) => (
                <li key={index}>
                  <InnerLink title={content} />
                </li>
              ))}
            </ul>
          </Typography>
        </Container>
        <Divider />
        <div className={classes.tableOfContents}>
          <Container>
            <Grid container justify="center" alignContent="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h5">
                  参加者向けの機能
                </Typography>
              </Grid>
            </Grid>
            {contentsOfUser.map((content, index) => (
              <Grid
                container
                justify="center"
                alignContent="center"
                key={index}
              >
                <Grid item xs={12} sm={6}>
                  <Card className={classes.content}>
                    <CardMedia
                      className={classes.media}
                      image={content.media}
                      title="screen"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={classes.content}>
                    <AnchorTitle title={content.title} />
                    <Typography variant="body1">{content.body}</Typography>
                  </div>
                </Grid>
              </Grid>
            ))}
          </Container>
        </div>
      </Page>
    </>
  );
};
