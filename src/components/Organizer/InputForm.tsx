import * as React from 'react';
import { Event } from 'domain/Event';
import { Formik, Field, FieldArray, Form, FormikActions } from 'formik';
// tslint:disable-next-line
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as H from 'history';
import { createRandomId } from 'utils/Id';
export interface InputFormProps {
  auth: Auth;
  event?: Event;
  handleSubmit: (values: unknown) => void;
  history: H.History;
}

export interface InputFormValues {
  id: string;
  name: string;
  url: string;
  ltTitles: string[];
  organizerUidsKeyNames: string[];
  date: number;
}

const inputForm: React.SFC<InputFormProps> = ({
  auth,
  event,
  handleSubmit,
  history
}) => {
  const id = createRandomId();
  let initialValues: InputFormValues = {
    id,
    name: '',
    url: id,
    ltTitles: [''],
    organizerUidsKeyNames: [auth.uid],
    date: new Date().getTime()
  };
  if (event) {
    initialValues = {
      id: event.id,
      name: event.name,
      url: event.url,
      ltTitles: event.ltTitles,
      date: event.date,
      organizerUidsKeyNames: Object.keys(event.organizerUids)
    };
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: InputFormValues,
          { setSubmitting }: FormikActions<InputFormValues>
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
                  placeholder="例）第2回 Kubernetes 関西ユーザーグループ 勉強会"
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
                イベントURL (※現在は変更できません)
              </label>
              <div className="control">
                <Field
                  className="input"
                  style={{ color: 'gray' }}
                  id="url"
                  name="url"
                  placeholder="例) kube-kansai-com-22"
                  type="text"
                  readonly="true"
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
                              placeholder="Kubernetes に向いてるサービス向いてないサービス"
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
            <div className="field">
              <label className="label" htmlFor="date">
                編集権限を持つオーガナイザー
              </label>
              <FieldArray
                name="organizerUidsKeyNames"
                render={arraryHelper => (
                  <div>
                    {values.organizerUidsKeyNames &&
                    values.organizerUidsKeyNames.length > 0 ? (
                      values.organizerUidsKeyNames.map((id, index) => (
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
                              name={`organizerUidsKeyNames.${index}`}
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
                            onClick={() => arraryHelper.push(auth.uid)}
                          >
                            Add a OrganizerUid
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
