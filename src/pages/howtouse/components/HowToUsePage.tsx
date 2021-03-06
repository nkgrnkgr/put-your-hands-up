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
import h2 from '../../../images/h2.png';
import h3 from '../../../images/h3.png';
import h4 from '../../../images/h4.png';
import h5 from '../../../images/h5.png';
import h6 from '../../../images/h6.png';
import h7 from '../../../images/h7.png';
import h8 from '../../../images/h8.png';
import h9 from '../../../images/h9.png';
import h10 from '../../../images/h10.png';
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
          初めて参加するイベントの場合は、イベント管理者からイベントページのURLを共有してもらってください
        </li>
        <li>
          <Link to="/dashboard">ダッシュボード</Link>
          で今まで参加したイベントページにアクセスできます。
        </li>
      </ul>
    ),
  },
  {
    title: 'コメントを投稿する',
    media: h2,
    body: (
      <ul>
        <li>
          コメント入力欄またはコメントアイコンをタップすることでコメント入力ができます
        </li>
        <li>
          コメントにはタグを付与することができ、カスタムタグを作ることもできます
        </li>
      </ul>
    ),
  },
  {
    title: '返信する',
    media: h3,
    body: (
      <ul>
        <li>
          投稿の返信アイコンをタップすることで、コメントに返信することができます
        </li>
      </ul>
    ),
  },
  {
    title: 'コメントをTwitterに同時投稿する',
    media: h4,
    body: (
      <ul>
        <li>
          <Link to="/setting">ユーザー設定</Link>
          にアクセスしTwitter連携を有効にします（TwitterにAPIの利用許諾を尋ねられるので許可してください）
        </li>
        <li>
          投稿時にTwitterアイコンをタップすることで、コメント投稿と同時に投稿ができます
        </li>
      </ul>
    ),
  },
  {
    title: '匿名ユーザーで名前/アイコンを変更する',
    media: h5,
    body: (
      <ul>
        <li>
          匿名ユーザーの場合
          <Link to="/setting">ユーザー設定</Link>
          にアクセスユーザー名とアイコンを変更することができます
        </li>
      </ul>
    ),
  },
  {
    title: 'ユーザーを削除する',
    media: h6,
    body: (
      <ul>
        <li>
          <Link to="/setting">ユーザー設定</Link>
          にアクセスしユーザー情報を削除することができます
        </li>
        <li>投稿やイベント参加記録、Twitter連携など全ての情報が削除されます</li>
        <li>
          一度削除した後に、ソーシャルアカウントでログインした場合新しいユーザーとして取り扱われます
        </li>
      </ul>
    ),
  },
];

const contentsOfOrganizer: Contents[] = [
  {
    title: 'イベントページの作成/編集をする',
    media: h7,
    body: (
      <ul>
        <li>
          <Link to="/organizer">イベントの管理</Link>
          にアクセスすることで、イベントの作成および編集ができます
        </li>
        <li>
          イベント名、イベント説明、ハッシュタグ、開催日時を入力することができます
        </li>
        <li>Connpass のイベントURLを入力すると自動で作成することができます</li>
      </ul>
    ),
  },
  {
    title: '登壇者情報を追加する',
    media: h8,
    body: (
      <ul>
        <li>イベントページには登壇者情報を追加/編集/削除ができます</li>
        <li>入力した登壇者情報ごとにイベントページでスレッドが作成されます</li>
      </ul>
    ),
  },
  {
    title: '参加者にイベントページを案内する',
    media: h9,
    body: (
      <ul>
        <li>
          <Link to="/organizer">イベントの管理</Link>
          でイベントごとのURLが確認できます
        </li>
        <li>イベントの参加者向けへはこのURLを共有してください</li>
        <li>
          イベント開始時にQRコードなどで連携するとスムーズにアクセスできます
        </li>
        <li>
          イベント開始後に参加される方のためにTwitterやConnpassを使ってURLを共有しておくと便利です
        </li>
      </ul>
    ),
  },
  {
    title: '登壇者への質問を抽出する',
    media: h10,
    body: (
      <ul>
        <li>
          <Link to={`/events/${process.env.REACT_APP_DEMO_EVENTID}`}>
            イベントページ
          </Link>
          では投稿されたコメントのタグをクリックすることで、同じタグがクリックされた投稿のみにフィルタできます
        </li>
        <li>
          登壇者の登壇後に質問を受け付ける場合は、このタグで抽出すると質問のみを抽出でき便利です。
        </li>
      </ul>
    ),
  },
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
                  <InnerLink title={content.title} />
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
                id={content.title}
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
                    <Typography variant="h5" className={classes.item}>
                      {content.title}
                    </Typography>
                    <Typography variant="body1">{content.body}</Typography>
                  </div>
                </Grid>
              </Grid>
            ))}
            <Divider />
            <Grid container justify="center" alignContent="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h5">
                  イベント管理者向けの機能
                </Typography>
              </Grid>
            </Grid>
            {contentsOfOrganizer.map((content, index) => (
              <Grid
                container
                justify="center"
                alignContent="center"
                key={index}
                id={content.title}
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
                    <Typography variant="h5" className={classes.item}>
                      {content.title}
                    </Typography>
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
