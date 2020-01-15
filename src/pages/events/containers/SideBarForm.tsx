import React from 'react';
import { Formik } from 'formik';
import { LTModel, createInitialLTModelValue } from '../../../models/Event';
import { SideBarForm as Component } from '../components/SideBarForm';

interface OuterProps {
  lts: LTModel[];
  index: number | null;
  closeModal: () => void;
}

export const SideBarForm = (props: OuterProps) => {
  const { lts, index, closeModal } = props;

  const onSubmit = (values: LTModel) => {
    alert(JSON.stringify(values, null, 2));
  };
  // indexが難しいのでデータ構造を変更するか？新規作成の場合に一番最後の数字にできるか

  const initialValues =
    index !== null ? lts[index] : createInitialLTModelValue();

  const onClickCancel = () => {
    closeModal();
  };
  const onClickDelete = () => {
    closeModal();
  };

  const shouldShowDeleteButton = index !== null;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={formikProps => (
        <Component
          {...formikProps}
          onClickDeleteButton={onClickDelete}
          onClickCancelButton={onClickCancel}
          shouldShowDeleteButton={shouldShowDeleteButton}
        />
      )}
    />
  );
};
