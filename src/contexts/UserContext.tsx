import React, { createContext, useState } from 'react';
import { initialUserData, UserModel } from '../models/User';

interface UserState {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
}

const initialUserState: UserState = {
  user: initialUserData,
  setUser: () => {},
};

export const UserContext = createContext<UserState>(initialUserState);

type ContextProps = Partial<UserState>;

export const UserContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel>({
    ...initialUserData,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
