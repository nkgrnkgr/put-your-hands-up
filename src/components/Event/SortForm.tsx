import * as React from 'react';
import { Formik, Field, Form, FormikActions } from 'formik';
export interface SearchFormProps {}

interface SortFormValues {
  sort: string;
}

const sortForm: React.SFC<SearchFormProps> = () => {
  const initialValues: SortFormValues = {
    sort: ''
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: SortFormValues,
          { setSubmitting }: FormikActions<SortFormValues>
        ) => {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
          }, 500);
        }}
        render={({ values, setFieldValue }) => (
          <Form>
            <div className="field has-addons">
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <Field component="select" name="sort">
                    <option value="like">Like</option>
                    <option value="updated">更新日</option>
                  </Field>
                </div>
              </div>
              <p className="control">
                <a className="button is-primary">Select</a>
              </p>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default sortForm;
