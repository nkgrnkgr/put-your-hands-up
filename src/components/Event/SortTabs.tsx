import * as React from 'react';
import { SortKey } from 'domain/SortKey';
export interface SortTabProps {
  sortKey: SortKey;
  setSortKey: (selectedValue: string) => void;
}

interface TabProps extends SortTabProps {
  title: string;
  iconClassName: string;
  value: string;
}

// tslint:disable-next-line
const Tab: React.SFC<TabProps> = ({
  sortKey,
  setSortKey,
  title,
  iconClassName,
  value
}) => {
  return (
    <li className={sortKey === value ? 'is-active' : ''}>
      <a onClick={e => setSortKey(value)}>
        <span className="icon is-small">
          <i className={iconClassName} />
        </span>
        <span>{title}</span>
      </a>
    </li>
  );
};

const sortTabs: React.SFC<SortTabProps> = ({ sortKey, setSortKey }) => {
  return (
    <div className="tabs is-fullwidth is-boxed is-medium">
      <ul>
        <Tab
          sortKey={sortKey}
          setSortKey={setSortKey}
          title={'新着コメント'}
          iconClassName={'fas fa-angle-up'}
          value={SortKey.Updated}
        />
        <Tab
          sortKey={sortKey}
          setSortKey={setSortKey}
          title={'人気コメント'}
          iconClassName={'fas fa-heart has-text-danger'}
          value={SortKey.MostLiked}
        />
      </ul>
    </div>
  );
};

export default sortTabs;
