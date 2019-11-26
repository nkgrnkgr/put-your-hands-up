import React, { createContext, useState } from 'react';
import { IntegrationsModel, createInitialValue } from '../models/Integrations';

interface IntegrationsState {
  integrations: IntegrationsModel;
  setIntegrations: React.Dispatch<React.SetStateAction<IntegrationsModel>>;
}

const initialState: IntegrationsState = {
  integrations: createInitialValue(),
  setIntegrations: () => {},
};

export const IntegrationsContext = createContext<IntegrationsState>(
  initialState,
);

type ContextProps = Partial<IntegrationsState>;

export const IntegrationsContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [integrations, setIntegrations] = useState<IntegrationsModel>(
    createInitialValue(),
  );

  return (
    <IntegrationsContext.Provider value={{ integrations, setIntegrations }}>
      {children}
    </IntegrationsContext.Provider>
  );
};
