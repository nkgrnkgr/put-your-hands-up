import {
  createStyles,
  Container,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Page } from '../../shared/components/Page';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
    },
    app: {
      height: '50px',
    },
    container: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      width: '80%',
    },
    title: {
      margin: theme.spacing(2),
    },
    body: {
      margin: theme.spacing(2),
    },
  }),
);

export const PrivacyPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Page>
      <Container className={classes.root}>
        <div id="back-to-top-anchor" className={classes.app} />
        <Paper className={classes.container}>
          <Typography className={classes.title} variant="h4">
            プライバシーポリシー
          </Typography>
          <Divider />
          <Typography className={classes.body} variant="body1">
            本サービスは、以下のプライバシーポリシー（以下「本ポリシー」といいます。）を定め、個人情報保護法を遵守すると共に、適切なプライバシー情報の保護に努めます。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第1条（プライバシー情報の定義）
          </Typography>
          <Typography className={classes.body} variant="body1">
            プライバシー情報のうち「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、連絡先その他の記述等により特定の個人を識別できる情報を指します。
            プライバシー情報のうち「履歴情報および特性情報」とは、上記に定める「個人情報」以外のものを指し、ご利用いただいたサービスやご覧になったページ、広告の履歴、登録ユーザーが検索された検索キーワード、ご利用日時、ご利用の方法、ご利用環境、登録ユーザーのIPアドレス、クッキー情報、端末の個体識別情報などを指します。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第2条（プライバシー情報の収集方法）
          </Typography>
          <Typography className={classes.body} variant="body1">
            本サービスは、登録ユーザーが利用登録をする際にメールアドレスなどの個人情報をお尋ねすることがあります。また、登録ユーザーと提携先などとの間でなされた登録ユーザーの個人情報を含む取引記録や、決済に関する情報を本サービスの提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
            本サービス、登録ユーザーについて、利用したサービスやソフトウエア、閲覧したページや広告の履歴、検索した検索キーワード、利用日時、利用方法、利用環境（携帯端末を通じてご利用の場合の当該端末の通信状態、利用に際しての各種設定情報なども含みます）、IPアドレス、クッキー情報、位置情報、端末の個体識別情報などの履歴情報および特性情報を、登録ユーザーが本サービスや提携先のサービスを利用しまたはページを閲覧する際に収集します。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第3条（個人情報を収集・利用する目的）
          </Typography>
          <Typography className={classes.body} variant="body1">
            本サービスにおいて個人情報を収集・利用する目的は、以下のとおりです。
          </Typography>
          <Typography className={classes.body} variant="body1">
            <ul>
              <li>
                登録ユーザーに自分の登録情報の閲覧や修正、利用状況の閲覧を行っていただくために、メールアドレスなどの登録情報、利用されたサービス、などに関する情報を表示する目的
              </li>
              <li>登録ユーザーにお知らせや連絡をする目的</li>
              <li>登録ユーザーからのお問い合わせに対応する目的</li>
              <li>その他上記の利用目的に付随する目的</li>
            </ul>
          </Typography>
          <Typography className={classes.title} variant="h5">
            第4条（個人情報の第三者提供）
          </Typography>
          <Typography className={classes.body} variant="body1">
            運営者は、次に掲げる場合を除いて、あらかじめ登録ユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
          </Typography>
          <Typography className={classes.body} variant="body1">
            <ul>
              <li>法令に基づく場合</li>
              <li>
                人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
              </li>
              <li>
                公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
              </li>
              <li>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
              </li>
              <li>予め次の事項を告知あるいは公表をしている場合</li>
            </ul>
          </Typography>
          <Typography className={classes.body} variant="body1">
            利用目的に第三者への提供を含むこと
          </Typography>
          <Typography className={classes.body} variant="body1">
            第三者に提供されるデータの項目
          </Typography>
          <Typography className={classes.body} variant="body1">
            第三者への提供の手段または方法
          </Typography>
          <Typography className={classes.body} variant="body1">
            本人の求めに応じて個人情報の第三者への提供を停止すること
          </Typography>
          <Typography className={classes.body} variant="body1">
            前項の定めにかかわらず、次に掲げる場合は第三者には該当しないものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            <ul>
              <li>
                運営者が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
              </li>
              <li>
                合併その他の事由による事業の承継に伴って個人情報が提供される場合
              </li>
            </ul>
          </Typography>
          <Typography className={classes.title} variant="h5">
            第5条（個人情報の訂正および削除）
          </Typography>
          <Typography className={classes.body} variant="body1">
            登録ユーザーは、運営者の保有する自己の個人情報が誤った情報である場合には、運営者が定める手続きにより、運営者に対して個人情報の訂正または削除を請求することができます。
          </Typography>
          <Typography className={classes.body} variant="body1">
            運営者は、登録ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正または削除を行い、これを登録ユーザーに通知します。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第6条（プライバシーポリシーの変更）
          </Typography>
          <Typography className={classes.body} variant="body1">
            本ポリシーの内容は、登録ユーザーに通知することなく、変更できるものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            運営者が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第6条（プライバシーポリシーの変更）
          </Typography>
          <Typography className={classes.body} variant="body1">
            本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            nkgrnkgr.put.your.hands.up@gmail.com
          </Typography>
        </Paper>
      </Container>
    </Page>
  );
};
