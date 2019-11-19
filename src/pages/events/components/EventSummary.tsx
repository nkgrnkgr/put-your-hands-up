import React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  eventName: string;
  eventDate: string;
  ltName: string;
}

export const EventSummary: React.FC<Props> = ({
  eventName,
  eventDate,
  ltName,
}) => (
  <>
    <Typography variant="h4">{ltName}</Typography>
    <Typography component="p">
      {eventName} - {eventDate}
    </Typography>
  </>
);
