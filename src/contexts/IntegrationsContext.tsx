import React, { createContext, useState } from 'react';
import { Integrations } from '../models/Integration';

interface IntegrationsState {
  integrations: Integrations | null;
  setIntegrations: React.Dispatch<React.SetStateAction<Integrations | null>>;
}

const initialState: IntegrationsState = {
  integrations: null,
  setIntegrations: () => {},
};

export const IntegrationsContext = createContext<IntegrationsState>(
  initialState,
);

type ContextProps = Partial<IntegrationsState>;

export const IntegrationsContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [integrations, setIntegrations] = useState<Integrations | null>(null);

  return (
    <IntegrationsContext.Provider value={{ integrations, setIntegrations }}>
      {children}
    </IntegrationsContext.Provider>
  );
};
