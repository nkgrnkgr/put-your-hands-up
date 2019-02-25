import * as React from 'react';
import { Formik, Form, FormikActions } from 'formik';
import * as H from 'history';
import UserIcon from 'components/UserIcon';
import ProvidedUser from 'containers/UserSetting/ProvidedUser';
import AnonymousUser from 'containers/UserSetting/AnonymousUser';
import { Color, saveUser, deleteUser } from 'domain/Anonymous';
import { FirebaseUser } from 'domain/FirebaseUser';
import userInfo from 'lib/userInfo';

export interface BaseProps {
  auth: Auth;
  firebase: Firebase;
  firestore: Firestore;
  name: string;
  hex: Color;
  twitterId: string;
  history: H.History;
  deleteMe: string;
  onChangeDeleteMe: (deleteMe: string) => void;
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

const composeUser = (
  user: FirebaseUser,
  name: string,
  hex: Color,
  twitterId: string
): FirebaseUser => {
  return {
    ...user,
    twitterId,
    displayName: name,
    anonymousColor: hex
  };
};

const saveUserSetting = (user: FirebaseUser): void => {
  if (user.isAnonymous) {
    saveUser(user.uid, user);
    // const { uid } = auth;
    // saveUser(uid, { uid, avatarUrl: 'url', displayName: '匿名ユーザー' });
    // const user = findUser(uid);
    // console.log(user);
    // deleteUser(uid);
  }
};

const base: React.SFC<BaseProps> = ({
  auth,
  firebase,
  firestore,
  history,
  name,
  hex,
  twitterId,
  deleteMe = '',
  onChangeDeleteMe
}) => {
  const deleteUserAccount = async (user: FirebaseUser) => {
    if (firestore && firestore.delete) {
      if (user.isAnonymous) {
        await deleteUser(user.uid);
      } else {
        await firestore.delete({ collection: 'users', doc: user.uid });
      }
      const notes = await firestore.get({
        collection: 'notes',
        where: [['user.uid', '==', user.uid]]
      });
      const docs: FirestoreDocument[] = notes.docs;
      docs.map(async doc => {
        if (doc && doc.exists) {
          await firestore.delete({ collection: 'notes', doc: doc.id });
        }
      });

      await firebase.logout();
      onChangeDeleteMe('');
      history.push('/');
    }
  };
  const canDeleteAccount = () => {
    return deleteMe === 'delete me';
  };
  const handleOnChangeDeleteMe = (text: string) => {
    onChangeDeleteMe(text);
  };
  const user = composeUser(userInfo(auth), name, hex, twitterId);
  return (
    <div className="container">
      <h1 className="title is-4">
        <span className="icon">
          <i className="fas fa-cog" />
        </span>
        <span> ユーザー設定</span>
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: SettingFormValues,
          { setSubmitting }: FormikActions<SettingFormValues>
        ) => {
          setSubmitting(false);
          saveUserSetting(user);
          // history.goBack();
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
                  <ProvidedUser user={user} setFieldValue={setFieldValue} />
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
      <hr />
      {/* <div className="field is-grouped is-grouped-centered">
      </div> */}
      <div className="field has-addons has-addons-centered">
        <p className="control">
          <label className="label">
            アカウントを削除するには delete me と入力してください
          </label>
        </p>
      </div>
      <div className="field has-addons has-addons-centered">
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="delete me"
            value={deleteMe}
            onChange={e => handleOnChangeDeleteMe(e.currentTarget.value)}
          />
        </p>
        <p className="control">
          <button
            className="Disabled button is-danger"
            disabled={!canDeleteAccount()}
            onClick={e => deleteUserAccount(user)}
          >
            アカウントを削除
          </button>
        </p>
      </div>
    </div>
  );
};

export default base;
