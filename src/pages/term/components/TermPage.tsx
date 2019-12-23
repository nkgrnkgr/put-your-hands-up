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

export const TermPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Page>
      <Container className={classes.root}>
        <div id="back-to-top-anchor" className={classes.app} />
        <Paper className={classes.container}>
          <Typography className={classes.title} variant="h4">
            利用規約
          </Typography>
          <Divider />
          <Typography className={classes.body} variant="body1">
            この利用規約（以下，「本規約」といいます。）は，PutYourHandsUp
            がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第1条（適用）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1.
            本規約は，本サービスの利用に関わる一切の関係に適用されるものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            当サービスは本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            3.
            本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします
          </Typography>
          <Typography className={classes.title} variant="h5">
            第2条（利用登録）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1.
            本サービスにおいては，登録希望者が本規約に同意の上，当サービスの定める方法によって利用登録を申請し，当サービスがこの承認を登録希望者に通知することによって，利用登録が完了するものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            当サービスは，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            <ul>
              <li>1. 利用登録の申請に際して虚偽の事項を届け出た場合</li>
              <li>2. 本規約に違反したことがある者からの申請である場合</li>
              <li>3. その他，当サービスが利用登録を相当でないと判断した場合</li>
            </ul>
          </Typography>
          <Typography className={classes.title} variant="h5">
            第3条（ユーザーIDおよびパスワードの管理）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1.
            ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。当サービスは，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            3.
            ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当サービスに故意又は重大な過失がある場合を除き，当サービスは一切の責任を負わないものとします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第5条（禁止事項）
          </Typography>
          <Typography className={classes.body} variant="body1">
            ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
          </Typography>
          <Typography className={classes.body} variant="body1">
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>
                当サービス，本サービスの他のユーザー，または第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
              </li>
              <li>サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>不正アクセスをし，またはこれを試みる行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>
                サービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
              </li>
              <li>
                本サービスの他のユーザーまたは第三者の知的財産権，肖像権，プライバシー，名誉その他の権利または利益を侵害する行為
              </li>
              <li>
                以下の表現を含み，または含むと判断する内容を本サービス上に投稿し，または送信する行為
              </li>
              <ul>
                <li>過度に暴力的な表現</li>
                <li>露骨な性的表現</li>
                <li>自殺，自傷行為，薬物乱用を誘引または助長する表現</li>
                <li>その他反社会的な内容を含み他人に不快感を与える表現</li>
              </ul>
              <li>以下を目的とし，または目的とすると判断する行為</li>
              <ul>
                <li>営業，宣伝，広告，勧誘，その他営利を目的とする行為</li>
                <li>性行為やわいせつな行為を目的とする行為</li>
                <li>面識のない異性との出会いや交際を目的とする行為</li>
                <li>他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為</li>
                <li>
                  本サービスの他のユーザー，または第三者に不利益，損害または不快感を与えることを目的とする行為
                </li>
                <li>
                  その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為
                </li>
              </ul>
              <li>宗教活動または宗教団体への勧誘行為</li>
              <li>その他，不適切と判断する行為</li>
            </ul>
          </Typography>
          <Typography className={classes.title} variant="h5">
            第6条（本サービスの提供の停止等）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1.
            以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            <ul>
              <li>
                本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
              </li>
              <li>
                地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合
              </li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他，本サービスの提供が困難と判断した場合</li>
            </ul>
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第7条（著作権）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1.
            ユーザーは，自ら著作権等の必要な知的財産権を有するか，または必要な権利者の許諾を得た文章，画像や映像等の情報に関してのみ，本サービスを利用し，投稿ないしアップロードすることができるものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            ユーザーが本サービスを利用して投稿ないしアップロードした文章，画像，映像等の著作権については，当該ユーザーその他既存の権利者に留保されるものとします。ただし，本サービスを利用して投稿ないしアップロードされた文章，画像，映像等について，本サービスの改良，品質の向上，または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で利用できるものとし，ユーザーは，この利用に関して，著作者人格権を行使しないものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            3.
            前項本文の定めるものを除き，本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべてその利用を許諾した権利者に帰属し，ユーザーは無断で複製，譲渡，貸与，翻訳，改変，転載，公衆送信（送信可能化を含みます。），伝送，配布，出版，営業使用等をしてはならないものとします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第8条（利用制限および登録抹消）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1.
            ユーザーが以下のいずれかに該当する場合には，事前の通知なく，投稿データを削除し，ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            <ul>
              <li>本規約のいずれかの条項に違反した場合</li>
              <li>登録事項に虚偽の事実があることが判明した場合</li>
              <li>
                決済手段として当該ユーザーが届け出たクレジットカードが利用停止となった場合
              </li>
              <li>料金等の支払債務の不履行があった場合</li>
              <li>連絡に対し，一定期間返答がない場合</li>
              <li>本サービスについて，最終の利用から一定期間利用がない場合</li>
              <li>その他，本サービスの利用を適当でないと判断した場合</li>
            </ul>
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            前項各号のいずれかに該当した場合，ユーザーは，当然に対する一切の債務について期限の利益を失い，その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
          </Typography>
          <Typography className={classes.body} variant="body1">
            3.
            本条に基づきが行った行為によりユーザーに生じた損害について，一切の責任を負いません。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第9条（退会）
          </Typography>
          <Typography className={classes.body} variant="body1">
            ユーザーは，定める退会手続により，本サービスから退会できるものとします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第10条（保証の否認および免責事項）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1.
            本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし，本サービスに関するユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
          </Typography>
          <Typography className={classes.body} variant="body1">
            3.
            前項ただし書に定める場合であっても，過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（ユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            4.
            本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第11条（サービス内容の変更等）
          </Typography>
          <Typography className={classes.body} variant="body1">
            ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第12条（利用規約の変更）
          </Typography>
          <Typography className={classes.body} variant="body1">
            必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第13条（個人情報の取扱い）
          </Typography>
          <Typography className={classes.body} variant="body1">
            本サービスの利用によって取得する個人情報については，「プライバシーポリシー」に従い適切に取り扱うものとします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第14条（通知または連絡）
          </Typography>
          <Typography className={classes.body} variant="body1">
            ユーザーから,別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第15条（権利義務の譲渡の禁止）
          </Typography>
          <Typography className={classes.body} variant="body1">
            ユーザーは，書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
          </Typography>
          <Typography className={classes.title} variant="h5">
            第16条（準拠法・裁判管轄）
          </Typography>
          <Typography className={classes.body} variant="body1">
            1. 本規約の解釈にあたっては，日本法を準拠法とします。
          </Typography>
          <Typography className={classes.body} variant="body1">
            2.
            本サービスに関して紛争が生じた場合には，本店所在地を管轄する裁判所を専属的合意管轄とします。
          </Typography>
        </Paper>
      </Container>
    </Page>
  );
};
