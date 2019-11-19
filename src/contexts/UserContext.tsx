import React, { createContext, useState } from 'react';
import { initialUserData, UserModel } from '../models/User';

interface UserValue {
  user: UserModel;
}

interface UserState {
  userValue: UserValue;
  setUserValue: React.Dispatch<React.SetStateAction<UserValue>>;
}

const initialUserValue: UserValue = {
  user: initialUserData,
};

const initialUserState: UserState = {
  userValue: initialUserValue,
  setUserValue: () => {},
};

export const UserContext = createContext<UserState>(initialUserState);

type ContextProps = Partial<UserState>;

export const UserContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [userValue, setUserValue] = useState<UserValue>({
    ...initialUserValue,
  });

  return (
    <UserContext.Provider value={{ userValue, setUserValue }}>
      {children}
    </UserContext.Provider>
  );
};
