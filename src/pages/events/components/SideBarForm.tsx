import { FormikProps } from 'formik';
import React from 'react';
import { LTModel } from '../../../models/Event';
import { EditLTForm } from '../../shared/components/EditLTForm';
import { EditButtons } from '../../shared/components/EditButtons';

type Props = {
  onClickCancelButton: () => void;
  onClickDeleteButton: () => void;
  shouldShowDeleteButton: boolean;
} & FormikProps<LTModel>;

export const SideBarForm: React.FC<Props> = (props: Props) => {
  const {
    values,
    handleChange,
    handleSubmit,
    onClickCancelButton,
    onClickDeleteButton,
    shouldShowDeleteButton,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <EditLTForm lt={values} handleChange={handleChange} />
      <EditButtons
        shouldShowDeleteButton={shouldShowDeleteButton}
        onClickCancelButton={onClickCancelButton}
        onClickDeleteButton={onClickDeleteButton}
      />
    </form>
  );
};
