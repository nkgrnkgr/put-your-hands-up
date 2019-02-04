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
    <div className="field has-addons is-horizontal has-addons-right">
      <div className="field-label is-normal">
        <label className="label">並び替え</label>
      </div>
      <div className="field-body">
        <div className="field is-narrow">
          <div className="control">
            <div className="select">
              <select value={sortKey} onChange={onChnageSelect}>
                <option value={SortKey.Updated}>新着順</option>
                <option value={SortKey.MostLiked}>人気順</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sortForm;
