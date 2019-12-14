import { FormikHelpers } from 'formik';

export const onFormikSubmitHandler = <T, R>(
  submitValues: R,
  action: FormikHelpers<T>,
) =>
  new Promise<R>(resolve => {
    action.setSubmitting(false);
    resolve(submitValues);
    action.resetForm();
  });
