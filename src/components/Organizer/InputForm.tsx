import * as React from 'react';
import { Event } from 'domain/Event';
import { Formik, Field, FieldArray, Form, FormikActions } from 'formik';
// tslint:disable-next-line
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as H from 'history';
import { createRandomId } from 'utils/Id';
export interface InputFormProps {
  event?: Event;
  handleSubmit: (values: unknown) => void;
  history: H.History;
}

interface Values {
  id: string;
  name: string;
  url: string;
  ltTitles: string[];
  date: number;
}

const inputForm: React.SFC<InputFormProps> = ({
  event,
  handleSubmit,
  history
}) => {
  const id = createRandomId();
  let initialValues: Values = {
    id,
    name: '',
    url: id,
    ltTitles: [],
    date: new Date().getTime()
  };
  if (event) {
    initialValues = {
      id: event.id,
      name: event.name,
      url: event.url,
      ltTitles: event.ltTitles,
      date: event.date
    };
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikActions<Values>
        ) => {
          setTimeout(() => {
            handleSubmit(values);
            setSubmitting(false);
            history.push('/organizer');
          }, 500);
        }}
        render={({ values, setFieldValue }) => (
          <Form>
            <div className="field">
              <label className="label" htmlFor="name">
                イベント名
              </label>
              <div className="control">
                <Field
                  className="input"
                  id="name"
                  name="name"
                  placeholder="name"
                  type="text"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="date">
                開催日時
              </label>
              <div className="control">
                <Field name="date" style={{ display: 'none' }} />
                <ReactDatepicker
                  selected={new Date(values.date)}
                  onChange={date => {
                    if (date) {
                      setFieldValue('date', date.getTime());
                    }
                  }}
                  showTimeSelect={true}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy/MM/dd HH:mm"
                  timeCaption="time"
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="date">
                イベントURL
              </label>
              <div className="control">
                <Field
                  className="input"
                  id="url"
                  name="url"
                  placeholder="name"
                  type="text"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="date">
                登壇タイトル
              </label>
              <FieldArray
                name="ltTitles"
                render={arraryHelper => (
                  <div>
                    {values.ltTitles && values.ltTitles.length > 0 ? (
                      values.ltTitles.map((ltTitle, index) => (
                        <div className="field is-grouped" key={index}>
                          <p className="control">
                            <button
                              type="button"
                              className="button is-danger"
                              onClick={() => arraryHelper.remove(index)}
                            >
                              -
                            </button>
                          </p>
                          <p className="control">
                            <button
                              type="button"
                              className="button is-info"
                              onClick={() => arraryHelper.insert(index + 1, '')}
                            >
                              +
                            </button>
                          </p>
                          <p className="control is-expanded">
                            <Field
                              className="input"
                              name={`ltTitles.${index}`}
                            />
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="field is-grouped">
                        <p className="control">
                          <button
                            type="button"
                            className="button is-info"
                            onClick={() => arraryHelper.push('')}
                          >
                            Add a LT Title
                          </button>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button type="submit" className="button is-primary">
                  保存
                </button>
              </p>
              <p className="control">
                <a className="button is-light" href="/organizer">
                  キャンセル
                </a>
              </p>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default inputForm;
