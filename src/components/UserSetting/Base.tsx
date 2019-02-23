import * as React from 'react';
import { Formik, Field, Form, FormikActions } from 'formik';
import * as H from 'history';
import FormWrapper from 'components/FormWrapper';
import UserIcon from 'components/UserIcon';
import userInfo from 'lib/userInfo';
import { FirebaseUser } from 'domain/FirebaseUser';
// import { saveUser, findUser, deleteUser } from 'domain/Anonymous';

export interface BaseProps {
  auth: Auth;
  history: H.History;
}

interface SettingFormValues {}

const initialValues: FirebaseUser = {
  displayName: '',
  avatarUrl: '',
  uid: '',
  isAnonymous: false,
  anonymousColor: 'black',
  eventIdsParticipated: [],
  twitterId: ''
};

const base: React.SFC<BaseProps> = ({ auth, history }) => {
  // const { uid } = auth;
  // saveUser(uid, { uid, avatarUrl: 'url', displayName: '匿名ユーザー' });
  // const user = findUser(uid);
  // console.log(user);
  // deleteUser(uid);
  const user = userInfo(auth);
  const {
    displayName,
    uid,
    // isAnonymous = true,
    // anonymousColor = 'black',
    // eventIdsParticipated = [],
    twitterId = ''
  } = user;
  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: SettingFormValues,
          { setSubmitting }: FormikActions<SettingFormValues>
        ) => {
          setTimeout(() => {
            setSubmitting(false);
            // history.push('/organizer');
          }, 500);
        }}
        render={({ values, setFieldValue }) => (
          <Form>
            <div className="columns is-tablet">
              <div className="column is-one-third">
                <div className="box">
                  <article className="media">
                    <div className="media-left">
                      <UserIcon user={user} imageSize={64} />
                    </div>
                    <div className="media-content">
                      <p>{`${displayName}`}</p>
                      <small style={{ fontSize: '0.5em' }}>
                        {`${twitterId}`}
                      </small>
                    </div>
                  </article>
                </div>
              </div>
              <div className="column">
                <FormWrapper labelName="表示名">
                  <Field
                    className="input"
                    name="displayName"
                    placeholder="@nkgrnkgr"
                    type="text"
                    value={displayName}
                  />
                </FormWrapper>
                <FormWrapper labelName="id">
                  <Field
                    className="input"
                    name="uid"
                    type="text"
                    style={{ color: 'gray' }}
                    readOnly={true}
                    value={uid}
                  />
                </FormWrapper>
              </div>
            </div>
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

export default base;
