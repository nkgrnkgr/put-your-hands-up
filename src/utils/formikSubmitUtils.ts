import { FormikHelpers } from 'formik';
import { now } from './datetime';

export const onFormikSubmitHandler = <T, R>(
  values: T,
  submitValues: R,
  action: FormikHelpers<T>,
  updateTimeField: keyof T & string,
) =>
  new Promise<R>(resolve => {
    action.setFieldValue(updateTimeField, now());
    action.setSubmitting(false);
    resolve(submitValues);
    action.resetForm();
  });
