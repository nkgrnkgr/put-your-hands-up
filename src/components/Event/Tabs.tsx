import * as React from 'react';
import { Event } from 'domain/Event';
import * as H from 'history';
import { match } from 'react-router';

interface Params {
  ltid: string;
}
export interface TabsProps {
  selectedTabIndex: number;
  event: Event;
  selectTab: (selectedTabIndex: number) => void;
  history: H.History;
  match: match<Params>;
}

const tabs: React.SFC<TabsProps> = ({
  event,
  selectedTabIndex,
  selectTab,
  history,
  match
}) => {
  const titles = ['Info'];
  event.lts.map(lt => titles.push(lt.title));
  const handleClick = (index: number) => {
    selectTab(index);
    console.log(match.path);
    console.log(match.url);
    console.log(match.params);
    console.log(match.isExact);
  };
  return (
    <div
      className="tabs"
      style={{
        overflow: 'hidden'
      }}
    >
      <ul>
        {titles.map((title, index) => {
          return (
            <li
              key={index}
              className={selectedTabIndex === index ? 'is-active' : ''}
            >
              <a onClick={e => handleClick(index)}>{title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default tabs;
