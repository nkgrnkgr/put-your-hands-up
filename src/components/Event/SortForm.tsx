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
            <div className="field has-addons is-horizontal has-addons-right">
              <div className="field-label is-normal">
                <label className="label">並び替え</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select">
                      <Field component="select" name="sort">
                        <option value="mostLiked">人気順</option>
                        <option value="new">新着順</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default sortForm;
