import * as React from 'react';
import { Events } from 'domain/Event';

export interface EventWrapperProps {
  auth: Auth;
  events: Events;
  firestore: Firestore;
  children: React.ReactNode;
}

const eventWrapper: React.SFC<EventWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default eventWrapper;
