import { FormikProps } from 'formik';
import React from 'react';
import { LTModel } from '../../../models/Event';
import { EditLTForm } from '../../shared/components/EditLTForm';

type Props = {
  index: number;
} & FormikProps<LTModel>;

export const SideBarForm: React.FC<Props> = (props: Props) => {
  const { index, values, handleChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <EditLTForm index={index} values={values} handleChange={handleChange} />
    </form>
  );
};
