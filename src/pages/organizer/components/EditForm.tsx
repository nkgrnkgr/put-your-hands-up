import React from 'react';
import { Button } from '@material-ui/core';
import { FormikProps } from 'formik';
import { EventModel } from '../../../models/Event';

type Props = FormikProps<EventModel>;
export const EditForm: React.FC<Props> = ({ handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} />
      <Button type="submit" color="primary" variant="outlined">
        更新
      </Button>
    </form>
  );
};
