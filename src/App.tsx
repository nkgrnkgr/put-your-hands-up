import * as React from 'react';
import 'bulma/css/bulma.css';
import 'src/css/animation.css';
import StickyNote from './components/StickyNote';
import InputForm from './components/InputForm';
import { Color } from 'src/logic/domain/Color';

class App extends React.Component {
  public render() {
    const testData = [
      {
        user: {
          username: 'Nokogiri',
          id: 'nkgrnkgr'
        },
        note: {
          comment:
            'このライブラリはどこからダウンロードできるかあとで教えてください😇',
          tagTitles: ['初心者', '質問'],
          createUserId: 'nkgrnkgr',
          fansIds: [
            'nkgrnkgr',
            'MAcadsPidLsBLYQH',
            'HLSJzKjV7uKyDrW2',
            'jt9rZC3crjhLCMAM',
            'FY3rWLRFAuReRwEc',
            'UKiTU2TFre89zLpM'
          ],
          color: Color.WHITE,
          editable: true,
          isUpdating: false,
          updated: 1541249701000
        },
        image: {
          // url: 'https://bulma.io/images/placeholders/96x96.png',
          url:
            'https://pbs.twimg.com/profile_images/991286980917936128/L26P2KQQ_400x400.jpg',
          title: 'nkgrnkgr',
          size: 32
        }
      },
      {
        user: {
          username: '匿名希望さん',
          id: 'HLSJzKjV7uKyDrW2'
        },
        note: {
          comment:
            'さっきのライブラリは既に最新バージョンでは非推奨です。xxを使いましょう😊',
          tagTitles: ['マサカリ'],
          createUserId: 'MAcadsPidLsBLYQH',
          fansIds: [''],
          color: Color.BLUE,
          editable: false,
          isUpdating: true,
          updated: 1541251714000
        },
        image: {
          url: 'https://bulma.io/images/placeholders/96x96.png',
          title: 'placeholder',
          size: 32
        }
      },
      {
        user: {
          username: 'あのにます',
          id: 'MAcadsPidLsBLYQH'
        },
        note: {
          comment: 'スライドの文字が小さいので見えない...',
          tagTitles: ['お願い'],
          createUserId: 'MAcadsPidLsBLYQH',
          fansIds: [''],
          color: Color.PINK,
          editable: false,
          isUpdating: false,
          updated: 1541251714000
        },
        image: {
          url: 'https://bulma.io/images/placeholders/96x96.png',
          title: 'placeholder',
          size: 32
        }
      }
    ];
    return (
      <section className="section">
        <nav className="navbar is-fixed-top">
          <div className="container">navbar</div>
        </nav>
        <div className="container">
          <div className="columns is-desktop">
            <StickyNote
              user={testData[0].user}
              image={testData[0].image}
              note={testData[0].note}
            />
            <StickyNote
              user={testData[1].user}
              image={testData[1].image}
              note={testData[1].note}
            />
            <StickyNote
              user={testData[2].user}
              image={testData[2].image}
              note={testData[2].note}
            />
          </div>
        </div>
        <div className="container">
          <nav className="navbar is-fixed-bottom">
            <div className="container">
              <InputForm />
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

export default App;
