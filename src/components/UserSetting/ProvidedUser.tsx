import * as React from 'react';
import FormWrapper from '../FormWrapper';
import { Field } from 'formik';
import { FirebaseUser } from 'domain/FirebaseUser';

export interface ProvidedUserProps {
  user: FirebaseUser;
}

const providedUser: React.SFC<ProvidedUserProps> = ({ user }) => {
  return (
    <>
      <FormWrapper labelName="id">
        <Field
          className="input"
          name="uid"
          type="text"
          style={{ color: 'gray' }}
          readOnly={true}
          value={user.uid}
        />
      </FormWrapper>
      <FormWrapper labelName="アイコンURL">
        <Field
          className="input"
          name="avatarUrl"
          placeholder=""
          type="text"
          value={user.avatarUrl}
        />
      </FormWrapper>
      <FormWrapper labelName="TwitterId">
        <Field
          className="input"
          name="avatarUrl"
          placeholder="@nkgrnkgr"
          type="text"
          value={user.twitterId}
        />
      </FormWrapper>
    </>
  );
};

export default providedUser;
