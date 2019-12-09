import React from 'react';
import { ApplicationContextProvider } from './ApplicationContext';
import { ConfirmDialogContextProvider } from './ConfirmDialogContext';
import { EventPageContextProvider } from './EventPageContext';
import { IntegrationsContextProvider } from './IntegrationsContext';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

export const ContextInjection: React.FC = ({ children }) => (
  <ApplicationContextProvider>
    <UserContextProvider>
      <IntegrationsContextProvider>
        <ConfirmDialogContextProvider>
          <NotificationContextProvider>
            <EventPageContextProvider>{children}</EventPageContextProvider>
          </NotificationContextProvider>
        </ConfirmDialogContextProvider>
      </IntegrationsContextProvider>
    </UserContextProvider>
  </ApplicationContextProvider>
);
