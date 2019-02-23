import * as React from 'react';
import { FirebaseUser } from 'domain/FirebaseUser';
import UserIcon from 'components/UserIcon';

export interface UserListProps {
  users?: FirebaseUser[];
  firestore: Firestore;
}

const tabs: React.SFC<UserListProps> = ({ users }) => {
  return (
    <nav className="level">
      <div className="level-left">
        <ul className="level-item">
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
    </nav>
  );
};

export default tabs;
