import * as React from 'react';
import { FirebaseUser } from 'domain/FirebaseUser';

export interface UserListProps {
  users?: FirebaseUser[];
  firestore: Firestore;
}

const tabs: React.SFC<UserListProps> = ({ users }) => {
  console.log('@users');
  console.log(users);
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
                    <figure className="image is-32x32">
                      <img
                        className="is-rounded"
                        src={user.avatarUrl}
                        style={{ border: '1px solid #ff3860' }}
                      />
                    </figure>
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
