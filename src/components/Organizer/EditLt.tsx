import * as React from 'react';
import { Formik, Field, Form, FormikActions } from 'formik';
import { Lt } from 'domain/Lt';
import { match } from 'react-router';
import FormWrapper from 'components/FormWrapper';
import { Event, Events } from 'domain/Event';
import Loading from 'components/Loading';
import * as H from 'history';

interface Params {
  eventId: string;
  index: string;
}

export interface EditLtProps {
  events: Events;
  firestore: Firestore;
  match: match<Params>;
  history: H.History;
}

const editLt: React.SFC<EditLtProps> = ({
  events,
  match,
  firestore,
  history
}) => {
  if (!events) return <Loading />;
  const event: Event = events[0];
  const { index } = match.params;
  const lt = event.lts.find((lt, i) => {
    return i === parseInt(index, 10) - 1;
  });

  const updateLt = (values: Lt) => {
    const ltsForUpdate = [...event.lts];
    ltsForUpdate[parseInt(index, 10) - 1] = values;
    firestore.update(
      { collection: 'events', doc: event.id },
      {
        lts: ltsForUpdate
      }
    );
  };

  return (
    <div>
      <Formik
        initialValues={lt}
        onSubmit={(values: Lt, { setSubmitting }: FormikActions<Lt>) => {
          setSubmitting(false);
          updateLt(values);
          alert('Saved!️');
        }}
        render={({ values, setFieldValue }) => (
          <Form>
            <FormWrapper labelName="登壇者情報">
              <span />
            </FormWrapper>
            <FormWrapper labelName="タイトル">
              <Field
                className="input"
                name={`title`}
                placeholder="Kubernetes に向いてるサービス向いてないサービス"
              />
            </FormWrapper>
            <FormWrapper labelName="登壇者">
              <Field
                className="input"
                name={`speakerName`}
                placeholder="@nkgrnkgr"
              />
            </FormWrapper>
            <FormWrapper labelName="リンク1">
              <Field
                className="input"
                name={`documentUrl1`}
                placeholder="https://twitter.com/nkgrnkgr?lang=ja"
              />
            </FormWrapper>
            <FormWrapper labelName="リンク2">
              <Field
                className="input"
                name={`documentUrl2`}
                placeholder="https://speakerdeck.com/..."
              />
            </FormWrapper>
            <FormWrapper labelName="リンク3">
              <Field
                className="input"
                name={`documentUrl3`}
                placeholder="https://speaker.portfolio.github.io/"
              />
            </FormWrapper>
            <hr />
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button type="submit" className="button is-info">
                  保存
                </button>
              </p>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default editLt;
