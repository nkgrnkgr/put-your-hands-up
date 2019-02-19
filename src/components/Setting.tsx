import * as React from 'react';
import { saveUser, findUser, deleteUser } from 'domain/Anonymous';

export interface SettingsProps {
  auth: Auth;
}

const setting: React.SFC<SettingsProps> = ({ auth }) => {
  const { uid } = auth;
  saveUser(uid, { uid, avatarUrl: 'url', displayName: '匿名ユーザー' });
  const user = findUser(uid);
  console.log(user);
  deleteUser(uid);
  return <div className="control">setting</div>;
};

export default setting;
