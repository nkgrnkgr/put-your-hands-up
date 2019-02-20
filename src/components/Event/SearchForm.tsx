import * as React from 'react';
import { Formik, Field, Form, FormikActions } from 'formik';
import 'css/searchForm.css';
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
      render={() => (
        <Form>
          <div className="field has-addons" style={{ margin: '10px' }}>
            <p className="control has-icons-right">
              <Field
                className="input search-input"
                id="query"
                name="query"
                placeholder="search..."
                type="text"
              />
              <a type="submit">
                <span className="icon is-small is-right">
                  <i className="fa fa-search" />
                </span>
              </a>
            </p>
          </div>
        </Form>
      )}
    />
  );
};

export default searchForm;
