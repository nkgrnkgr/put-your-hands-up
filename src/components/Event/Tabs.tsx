import * as React from 'react';
import { Event } from 'domain/Event';

export interface TabsProps {
  selectedTabIndex: number;
  event: Event;
  selectTab: (selectedTabIndex: number) => void;
}

const tabs: React.SFC<TabsProps> = ({ event, selectedTabIndex, selectTab }) => {
  const titles = ['general'];
  event.lts.map(lt => titles.push(lt.title));
  const handleClick = (index: number) => {
    selectTab(index);
  };
  return (
    <section className="has-background-danger">
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <ul className="tab-group">
            {titles.map((title, index) => {
              return (
                <li
                  key={index}
                  className={selectedTabIndex === index ? 'active-tab' : 'tab'}
                >
                  <a onClick={e => handleClick(index)}>{`#${title}`}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default tabs;
