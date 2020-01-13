import React from 'react';
import { Formik } from 'formik';
import { createInitialLTModelValue, LTModel } from '../../../models/Event';
import { EditLTForm as Component } from '../components/EditLTForm';

interface OuterProps {
  lt?: LTModel;
  index: number;
}

export const EditLTForm = (props: OuterProps) => {
  const { lt } = props;

  const initialValues: LTModel = lt || createInitialLTModelValue();

  const onSubmit = () => {
    console.error('submitted');
  };
  // indexが難しいのでデータ構造を変更するか？新規作成の場合に一番最後の数字にできるか

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      component={Component}
    />
  );
};
