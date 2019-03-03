import * as React from 'react';
import { FirebaseUser } from 'domain/FirebaseUser';
import UserIcon from 'components/UserIcon';

export interface UserListProps {
  users?: FirebaseUser[];
  firestore: Firestore;
}

const userList: React.SFC<UserListProps> = ({ users }) => {
  return (
    <div style={{ margin: '10px 0' }}>
      <ul style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
        {users
          ? users.map((user, index) => {
              return (
                <li
                  key={index}
                  className="tooltip is-tooltip-bottom"
                  data-tooltip={user.displayName}
                >
                  <UserIcon
                    user={user}
                    isRoundedImg={true}
                    customStyleForImg={{ border: '1px solid #ff3860' }}
                  />
                </li>
              );
            })
          : ''}
      </ul>
    </div>
  );
};

export default userList;
