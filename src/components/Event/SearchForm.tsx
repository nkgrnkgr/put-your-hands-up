import * as React from 'react';
import { Formik, Field, Form, FormikActions } from 'formik';
export interface SearchFormProps {}

interface SearchFormValues {
  query: string;
}

const searchForm: React.SFC<SearchFormProps> = () => {
  const initialValues: SearchFormValues = {
    query: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: SearchFormValues,
        { setSubmitting }: FormikActions<SearchFormValues>
      ) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 500);
      }}
      render={({ values, setFieldValue }) => (
        <Form>
          <div className="field has-addons">
            <p className="control has-icons-left is-expanded">
              <Field
                className="input"
                id="query"
                name="query"
                placeholder=""
                type="text"
              />
              <span className="icon is-small is-left">
                <i className="fa fa-search" />
              </span>
            </p>
            <p className="control">
              <a className="button is-info">Search</a>
            </p>
          </div>
        </Form>
      )}
    />
  );
};

export default searchForm;
