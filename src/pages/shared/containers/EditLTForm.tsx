import React from 'react';
import { Formik } from 'formik';
import { LTModel } from '../../../models/Event';
import { EditLTForm as Component } from '../components/EditLTForm';

interface OuterProps {
  lt: LTModel;
  index: number;
}

export const EditLTForm = (props: OuterProps) => {
  const { lt, index } = props;

  const onSubmit = (values: LTModel) => {
    console.error(values);
  };
  // indexが難しいのでデータ構造を変更するか？新規作成の場合に一番最後の数字にできるか

  return (
    <Formik
      initialValues={lt}
      onSubmit={onSubmit}
      render={formikProps => <Component {...formikProps} index={index} />}
    />
  );
};
