import * as React from 'react';
import { Formik, Form, FormikActions } from 'formik';
import * as H from 'history';
import UserIcon from 'components/UserIcon';
import ProvidedUser from 'components/UserSetting/ProvidedUser';
import AnonymousUser from 'containers/UserSetting/AnonymousUser';
import { Color } from 'domain/Anonymous';
import userInfo from 'lib/userInfo';
// import { saveUser, findUser, deleteUser } from 'domain/Anonymous';

export interface BaseProps {
  auth: Auth;
  name: string;
  hex: Color;
  history: H.History;
}

export interface SettingFormValues {
  displayName?: string;
  anonymousColor?: string;
  twitterId?: string;
}

const initialValues = {
  displayName: '',
  anonymousColor: '#000000',
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

  const user = userInfo(auth);
  user.displayName = name;
  user.anonymousColor = hex;
  user.twitterId = '';

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
                      <p>{`${user.displayName}`}</p>
                      <small style={{ fontSize: '0.5em' }}>
                        {`${user.twitterId}`}
                      </small>
                    </div>
                  </article>
                </div>
              </div>
              <div className="column">
                {user.isAnonymous ? (
                  <AnonymousUser user={user} setFieldValue={setFieldValue} />
                ) : (
                  <ProvidedUser user={user} />
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
