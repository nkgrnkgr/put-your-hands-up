import * as React from 'react';

export interface FormWrapper {
  labelName: string;
  classNames?: string;
  style?: {};
}

const formWrapper: React.SFC<FormWrapper> = props => {
  const { labelName, classNames, children, style } = props;
  return (
    <div className={`field is-horizontal ${classNames}`} style={style}>
      <div className="field-label is-normal">
        <label className="label" htmlFor="name">
          {labelName}
        </label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <>{children}</>
          </div>
        </div>
      </div>
    </div>
  );
};

export default formWrapper;
