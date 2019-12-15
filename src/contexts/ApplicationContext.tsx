import React, { createContext, useState } from 'react';

interface AppclicationValues {
  isFirebaseAuthInitialized: boolean;
  isSidebarOpen: boolean;
  isOpenNoteForm: boolean;
  isOpenReplayComments: boolean;
}

interface ApplicationState {
  applicationValues: AppclicationValues;
  setApplicationValues: React.Dispatch<
    React.SetStateAction<AppclicationValues>
  >;
}

const initialApplicationValues: AppclicationValues = {
  isFirebaseAuthInitialized: false,
  isSidebarOpen: true,
  isOpenNoteForm: false,
  isOpenReplayComments: false,
};

const initialApplicationState: ApplicationState = {
  applicationValues: initialApplicationValues,
  setApplicationValues: () => {},
};

export const ApplicationContext = createContext<ApplicationState>(
  initialApplicationState,
);

interface ApplicationContextProviderProps {
  defaults?: Partial<AppclicationValues>;
}

export const ApplicationContextProvider: React.FC<ApplicationContextProviderProps> = ({
  defaults,
  children,
}) => {
  const [applicationValues, setApplicationValues] = useState<
    AppclicationValues
  >({
    ...initialApplicationValues,
    ...defaults,
  });

  return (
    <ApplicationContext.Provider
      value={{ applicationValues, setApplicationValues }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
