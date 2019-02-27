import * as React from 'react';
import FormWrapper from '../FormWrapper';
import { FirebaseUser } from 'domain/FirebaseUser';

export interface ProvidedUserProps {
  auth: Auth;
  user: FirebaseUser;
  setFieldValue: Function;
  onChangeName: (name: string) => void;
  onChangeTwitterId: (twitterId: string) => void;
}

const providedUser: React.SFC<ProvidedUserProps> = ({
  user,
  onChangeName,
  onChangeTwitterId,
  setFieldValue
}) => {
  const handleOnChangeText = (text: string) => {
    onChangeName(text);
    setFieldValue('displayName', text);
  };
  const handleOnChangeTwitterId = (text: string) => {
    onChangeTwitterId(text);
    setFieldValue('twitterId', text);
  };
  return (
    <>
      <FormWrapper labelName="id">
        <input
          className="input"
          type="text"
          style={{ color: 'gray' }}
          value={user.uid}
          readOnly={true}
        />
      </FormWrapper>
      <FormWrapper labelName="表示名" style={{ display: 'none' }}>
        <input
          className="input"
          type="text"
          value={user.displayName}
          onChange={e => handleOnChangeText(e.currentTarget.value)}
          style={{ color: 'gray' }}
          readOnly={true}
        />
      </FormWrapper>
      <FormWrapper labelName="TwiiierId" style={{ display: 'none' }}>
        <input
          className="input"
          type="text"
          value={user.twitterId}
          onChange={e => handleOnChangeTwitterId(e.currentTarget.value)}
          style={{ color: 'gray' }}
          readOnly={true}
        />
      </FormWrapper>
    </>
  );
};

export default providedUser;
