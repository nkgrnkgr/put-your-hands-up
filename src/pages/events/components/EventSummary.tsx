import React from 'react';
import { Typography, Button } from '@material-ui/core';

interface Props {
  eventName: string;
  eventDate: string;
  ltName: string;
  hashTag: string;
}

export const EventSummary: React.FC<Props> = ({
  eventName,
  eventDate,
  ltName,
  hashTag,
}) => (
  <>
    <Typography variant="h4">{ltName}</Typography>
    <Typography component="p">
      {eventName} - {eventDate}
    </Typography>
    <>
      {hashTag && (
        <Button
          color="secondary"
          variant="text"
          style={{ textTransform: 'none' }}
          href={`https://twitter.com/hashtag/${hashTag}`}
          target="_brank"
          rel="noopener"
        >
          #{hashTag}
        </Button>
      )}
    </>
  </>
);
