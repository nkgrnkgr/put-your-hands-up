import * as React from 'react';
import { Lt } from 'domain/Lt';

export interface BoxProps {
  lt: Lt;
  index: number;
  selectTab: (selectedTabIndex: number) => void;
}

const anchor = (url: string) => {
  if (url === '') {
    return '';
  }
  return (
    <div>
      <span className="icon">
        <i className="fas fa-file" />
      </span>
      <a href={url} rel="noopener noreferrer" target="blank">
        {url}
      </a>
    </div>
  );
};

const box: React.SFC<BoxProps> = ({ lt, index, selectTab }) => {
  const handleOnClick = (index: number) => {
    selectTab(index + 1);
  };
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <a className="button is-info" onClick={e => handleOnClick(index)}>
            コメントを見る
          </a>
        </div>
        <div className="media-content">
          <div className="content">
            <a className="button is-white">
              <span className="icon">
                <i className="fas fa-chalkboard-teacher" />
              </span>
              <span>{`${lt.title}`}</span>
            </a>
            <a className="button is-white">
              <span className="icon">
                <i className="fas fa-user" />
              </span>
              <span>{`${lt.speakerName}`}</span>
            </a>
            <div>
              {anchor(lt.documentUrl1)}
              {anchor(lt.documentUrl2)}
              {anchor(lt.documentUrl3)}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default box;
