import * as React from 'react';
export interface SortFormProps {
  setSortKey: (selectedValue: string) => void;
}

const sortForm: React.SFC<SortFormProps> = ({ setSortKey }) => {
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
              <select name="sort" onChange={onChnageSelect}>
                <option value="updated">新着順</option>
                <option value="mostLiked">人気順</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sortForm;
