import * as React from 'react';
import { Event } from 'domain/Event';
import { Formik, Field, FieldArray, Form, FormikActions } from 'formik';
// tslint:disable-next-line
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as H from 'history';
import { createRandomId } from 'utils/Id';
import { Lt, createInitialValue } from 'domain/Lt';
import FormWrapper from 'components/FormWrapper';
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
  lts: Lt[];
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
    lts: [createInitialValue()],
    organizerUidsKeyNames: [auth.uid],
    date: new Date().getTime()
  };
  if (event) {
    initialValues = {
      id: event.id,
      name: event.name,
      url: event.url,
      lts: event.lts,
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
            <FormWrapper labelName="イベント名">
              <Field
                className="input"
                id="name"
                name="name"
                placeholder="例）第2回 Kubernetes 関西ユーザーグループ 勉強会"
                type="text"
              />
            </FormWrapper>
            <FormWrapper labelName="開催日時">
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
            </FormWrapper>
            <FormWrapper labelName="URL(変更不可)">
              <Field
                className="input"
                style={{ color: 'gray' }}
                id="url"
                name="url"
                placeholder="例) kube-kansai-com-22"
                type="text"
                readOnly={true}
              />
            </FormWrapper>
            <hr />
            <FormWrapper labelName="登壇者情報">
              <span />
            </FormWrapper>
            <FieldArray
              name="lts"
              render={arraryHelper => (
                <div className="field">
                  {values.lts && values.lts.length > 0 ? (
                    values.lts.map((lt, index) => (
                      <div key={index}>
                        <FormWrapper labelName="タイトル">
                          <Field
                            className="input"
                            name={`lts.${index}.title`}
                            placeholder="Kubernetes に向いてるサービス向いてないサービス"
                          />
                        </FormWrapper>
                        <FormWrapper labelName="登壇者">
                          <Field
                            className="input"
                            name={`lts.${index}.speakerName`}
                            placeholder="@nkgrnkgr"
                          />
                        </FormWrapper>
                        <FormWrapper labelName="リンク1">
                          <Field
                            className="input"
                            name={`lts.${index}.documentUrl1`}
                            placeholder="https://twitter.com/nkgrnkgr?lang=ja"
                          />
                        </FormWrapper>
                        <FormWrapper labelName="リンク2">
                          <Field
                            className="input"
                            name={`lts.${index}.documentUrl2`}
                            placeholder="https://speakerdeck.com/..."
                          />
                        </FormWrapper>
                        <FormWrapper labelName="リンク3">
                          <Field
                            className="input"
                            name={`lts.${index}.documentUrl3`}
                            placeholder="https://speaker.portfolio.github.io/"
                          />
                        </FormWrapper>
                        <FormWrapper
                          labelName=""
                          classNames="is-grouped is-grouped-centered"
                        >
                          <button
                            type="button"
                            className="button is-danger"
                            onClick={() => arraryHelper.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="button is-info"
                            onClick={() =>
                              arraryHelper.insert(
                                index + 1,
                                createInitialValue()
                              )
                            }
                          >
                            +
                          </button>
                        </FormWrapper>
                        <FormWrapper labelName="">
                          <div />
                        </FormWrapper>
                      </div>
                    ))
                  ) : (
                    <FormWrapper labelName="登壇情報の追加">
                      <button
                        type="button"
                        className="button is-info"
                        onClick={() => arraryHelper.push(createInitialValue())}
                      >
                        追加
                      </button>
                    </FormWrapper>
                  )}
                </div>
              )}
            />
            <hr />
            <FormWrapper labelName="イベント編集権限">
              <label className="control">
                <span className="button is-white">
                  Your ID: {values.organizerUidsKeyNames[0]}
                </span>
              </label>
            </FormWrapper>
            <FieldArray
              name="organizerUidsKeyNames"
              render={arraryHelper => {
                const { organizerUidsKeyNames } = values;
                if (organizerUidsKeyNames && organizerUidsKeyNames.length > 1) {
                  return (
                    <div>
                      {organizerUidsKeyNames.map((name, index) => {
                        if (index === 0) {
                          return <span />;
                        }
                        return (
                          <div key={index}>
                            <FormWrapper labelName="">
                              <Field
                                className="input"
                                name={`organizerUidsKeyNames.${index}`}
                              />
                            </FormWrapper>
                            <FormWrapper
                              labelName=""
                              classNames="is-grouped is-grouped-centered"
                            >
                              <button
                                type="button"
                                className="button is-danger"
                                onClick={() => arraryHelper.remove(index)}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                className="button is-info"
                                onClick={() =>
                                  arraryHelper.insert(index + 1, '')
                                }
                              >
                                +
                              </button>
                            </FormWrapper>
                            <FormWrapper labelName="">
                              <div />
                            </FormWrapper>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return (
                  <FormWrapper labelName="編集権限の追加">
                    <button
                      type="button"
                      className="button is-info"
                      onClick={() => arraryHelper.push('')}
                    >
                      追加
                    </button>
                  </FormWrapper>
                );
              }}
            />
            <hr />
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
