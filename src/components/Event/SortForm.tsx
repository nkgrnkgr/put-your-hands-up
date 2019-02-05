import * as React from 'react';
import { SortKey } from 'domain/SortKey';
export interface SortFormProps {
  sortKey: SortKey;
  setSortKey: (selectedValue: string) => void;
}

const sortForm: React.SFC<SortFormProps> = ({ sortKey, setSortKey }) => {
  const onChnageSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setSortKey(e.currentTarget.value);
  };

  return (
    <div className="field has-addons has-addons-right">
      <div className="control">
        <div className="select">
          <select value={sortKey} onChange={onChnageSelect}>
            <option value={SortKey.Updated}>新着順</option>
            <option value={SortKey.MostLiked}>人気順</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default sortForm;
