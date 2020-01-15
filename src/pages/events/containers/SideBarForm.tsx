import React from 'react';
import { Formik } from 'formik';
import { LTModel, createInitialLTModelValue } from '../../../models/Event';
import { SideBarForm as Component } from '../components/SideBarForm';

interface OuterProps {
  lts: LTModel[];
  index: number | null;
}

export const SideBarForm = (props: OuterProps) => {
  const { lts, index } = props;

  const onSubmit = (values: LTModel) => {
    console.error(values);
  };
  // indexが難しいのでデータ構造を変更するか？新規作成の場合に一番最後の数字にできるか

  const initialValues =
    index !== null ? lts[index] : createInitialLTModelValue();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={formikProps => (
        <Component
          {...formikProps}
          index={index !== null ? index : lts.length}
        />
      )}
    />
  );
};
