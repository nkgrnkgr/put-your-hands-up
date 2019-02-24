import { actionCreatorFactory } from 'typescript-fsa';

const actionCreater = actionCreatorFactory();

export interface UserSettingActionPayload {
  name?: string;
  hex?: string;
  twitterId?: string;
  deleteMe?: string;
}

export const onChangeName = actionCreater<UserSettingActionPayload>(
  'USER_SETTING_ON_CHANGE_NAME'
);

export const onSelectColorHex = actionCreater<UserSettingActionPayload>(
  'USER_SETTING_ON_SELECT_COLOR_HEX'
);

export const onChangeTwitterId = actionCreater<UserSettingActionPayload>(
  'USER_SETTING_ON_CHANGE_TWITTER_ID'
);

export const onChangeDeleteMe = actionCreater<UserSettingActionPayload>(
  'USER_SETTING_ON_CHANGE_DELETE_ME'
);
