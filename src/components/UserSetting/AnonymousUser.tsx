import * as React from 'react';
import FormWrapper from '../FormWrapper';
import { CirclePicker } from 'react-color';
import { Field } from 'formik';
import { FirebaseUser } from 'domain/FirebaseUser';
import { COLOR_HEX } from 'domain/Anonymous';

export interface AnonymousUserProps {
  auth: Auth;
  user: FirebaseUser;
  onChangeName: (name: string) => void;
  onSelectColorHex: (hex: string) => void;
  setFieldValue: Function;
}

const anonymousUser: React.SFC<AnonymousUserProps> = ({
  user,
  onChangeName,
  onSelectColorHex,
  setFieldValue
}) => {
  const handleOnChangeText = (text: string) => {
    onChangeName(text);
    setFieldValue('displayName', text);
  };
  const handleOnSwatchHover = (hex: string) => {
    if (hex !== undefined) {
      onSelectColorHex(hex);
      setFieldValue('anonymousColor', hex);
    }
  };

  return (
    <>
      <FormWrapper labelName="表示名">
        <input
          className="input"
          type="text"
          value={user.displayName}
          onChange={e => handleOnChangeText(e.currentTarget.value)}
        />
      </FormWrapper>
      <FormWrapper labelName="アイコンカラー">
        <Field
          name="color"
          value={user.anonymousColor}
          render={() => {
            return (
              <CirclePicker
                colors={COLOR_HEX}
                width={'100%'}
                onSwatchHover={colorResult =>
                  handleOnSwatchHover(colorResult.hex)
                }
              />
            );
          }}
        />
      </FormWrapper>
    </>
  );
};

export default anonymousUser;