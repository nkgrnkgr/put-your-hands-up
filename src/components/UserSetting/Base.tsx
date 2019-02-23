import * as React from 'react';
import { Formik, Form, FormikActions } from 'formik';
import * as H from 'history';
import UserIcon from 'components/UserIcon';
import userInfo from 'lib/userInfo';
import { FirebaseUser } from 'domain/FirebaseUser';
import ProvidedUser from 'components/UserSetting/ProvidedUser';
import AnonymousUser from 'containers/UserSetting/AnonymousUser';
import { Color } from 'domain/Anonymous';
// import { saveUser, findUser, deleteUser } from 'domain/Anonymous';

export interface BaseProps {
  auth: Auth;
  name: string;
  hex: Color;
  history: H.History;
}

interface SettingFormValues {}

const initialValues: FirebaseUser = {
  displayName: '',
  avatarUrl: '',
  uid: '',
  isAnonymous: false,
  anonymousColor: '#000000',
  eventIdsParticipated: [],
  twitterId: ''
};

const base: React.SFC<BaseProps> = ({
  auth,
  history,
  name,
  hex = '#000000'
}) => {
  // const { uid } = auth;
  // saveUser(uid, { uid, avatarUrl: 'url', displayName: '匿名ユーザー' });
  // const user = findUser(uid);
  // console.log(user);
  // deleteUser(uid);

  const inputtingUser: FirebaseUser = {
    displayName: name,
    avatarUrl: userInfo(auth).avatarUrl,
    uid: userInfo(auth).uid,
    isAnonymous: userInfo(auth).isAnonymous,
    anonymousColor: hex,
    eventIdsParticipated: userInfo(auth).eventIdsParticipated,
    twitterId: ''
  };

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
                      <UserIcon user={inputtingUser} imageSize={64} />
                    </div>
                    <div className="media-content">
                      <p>{`${inputtingUser.displayName}`}</p>
                      <small style={{ fontSize: '0.5em' }}>
                        {`${inputtingUser.twitterId}`}
                      </small>
                    </div>
                  </article>
                </div>
              </div>
              <div className="column">
                {inputtingUser.isAnonymous ? (
                  <AnonymousUser user={inputtingUser} />
                ) : (
                  <ProvidedUser user={inputtingUser} />
                )}
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
