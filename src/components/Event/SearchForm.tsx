import * as React from 'react';
import { Formik, Field, Form, FormikActions } from 'formik';
import Tag from 'domain/Tag';
export interface SearchFormProps {
  query: string;
  searchQuery: (query: string) => void;
  addTag: (tag: Tag) => void;
}

const HASH_TAG = '#';

interface SearchFormValues {
  query: string;
}

const isTagSearch = (query: string): boolean => {
  return query.indexOf(HASH_TAG) > -1;
};

const searchForm: React.SFC<SearchFormProps> = ({
  query,
  searchQuery,
  addTag
}) => {
  const initialValues: SearchFormValues = {
    query
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: SearchFormValues,
        { setSubmitting, setFieldValue }: FormikActions<SearchFormValues>
      ) => {
        if (isTagSearch(values.query)) {
          const title = values.query.replace(HASH_TAG, '');
          addTag({
            title,
            isFeatured: false
          });
          setFieldValue('query', '');
        } else {
          searchQuery(values.query);
        }
        setSubmitting(false);
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
              <button type="submit" className="button is-info">
                Search
              </button>
            </p>
          </div>
        </Form>
      )}
    />
  );
};

export default searchForm;
