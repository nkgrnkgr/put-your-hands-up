import * as React from 'react';
import { Event } from 'domain/Event';
import { Formik, Field, FieldArray, Form, FormikActions } from 'formik';
// tslint:disable-next-line
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface InputFormProps {
  event?: Event;
}

interface Values {
  name: string;
  ltTitles: string[];
  date: number;
}

const inputForm: React.SFC<InputFormProps> = ({ event }) => {
  let initialValues: Values = {
    name: '',
    ltTitles: [],
    date: 0
  };
  if (event) {
    initialValues = {
      name: event.name,
      ltTitles: event.ltTitles,
      date: event.date
    };
  }
  return (
    <div>
      <h2>InputForm</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikActions<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
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
                <a className="button is-light">キャンセル</a>
              </p>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default inputForm;
