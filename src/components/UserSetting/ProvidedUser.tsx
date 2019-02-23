import * as React from 'react';
import FormWrapper from '../FormWrapper';
import { Field } from 'formik';
import { FirebaseUser } from 'domain/FirebaseUser';

export interface ProvidedUserProps {
  user: FirebaseUser;
}

const providedUser: React.SFC<ProvidedUserProps> = ({ user }) => {
  return (
    <div>
      <FormWrapper labelName="アイコンURL">
        <Field
          className="input"
          name="avatarUrl"
          placeholder="@nkgrnkgr"
          type="text"
          value={user.avatarUrl}
        />
      </FormWrapper>
    </div>
  );
};

export default providedUser;
