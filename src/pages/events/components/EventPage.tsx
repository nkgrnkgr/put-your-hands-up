import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { useEventsUrl } from '../../../hooks/useEventsUrl';
import { EventModel, LTModel } from '../../../models/Event';
import { getYearMonthDayHourMitutes } from '../../../utils/datetime';
import { HtmlTitle } from '../../shared/components/HtmlTitle';
import { PageHeader } from '../../shared/containers/PageHeader';
import { ModalFab } from '../containers/ModalFab';
import { NoteForm } from '../containers/NoteForm';
import { NoteList } from '../containers/NoteList';
import { ParticipatedUsers } from '../containers/ParticipatedUsers';
import { RightSideBar } from '../containers/RightSideBar';
import { SideBar } from '../containers/SideBar';
import { SortTab } from '../containers/SortTab';
import { EventSummary } from './EventSummary';
import { LtTopics } from './LtTopics';
import { ParticipatedEventIdUpdater } from '../containers/ParticipatedEventIdUpdater';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  app: {
    height: '100px',
  },
});

const getLtName = (lts: LTModel[], ltId: string): string => {
  const targetLt = lts.find(lt => lt.id === ltId);
  if (ltId === '0' || !targetLt) {
    return '#general';
  }

  return '#' + targetLt.title;
};

interface Props {
  event: EventModel;
}

export const Eventpage: React.FC<Props> = ({ event }) => {
  const classes = useStyles();
  const { ltId: ltIdFound } = useEventsUrl();
  const ltId = ltIdFound || '0';
  const ltName = getLtName(event.lts, ltId);

  return (
    <div className={classes.root}>
      <ParticipatedEventIdUpdater>
        <PageHeader />
        <SideBar lts={event.lts} />
        <Container style={{ flexGrow: 0 }}>
          <div id="back-to-top-anchor" className={classes.app} />
          <HtmlTitle title={ltName} />
          <EventSummary
            eventName={event.name}
            eventDate={getYearMonthDayHourMitutes(event.date)}
            ltName={ltName}
            hashTag={event.hashTag}
          />
          <ParticipatedUsers event={event} />
          {ltId === '0' && <LtTopics eventId={event.id} lts={event.lts} />}
          <NoteForm eventId={event.id} ltId={ltId} hashTag={event.hashTag} />
          <ModalFab />
          <SortTab />
          <NoteList eventId={event.id} ltId={ltId} />
          <RightSideBar />
        </Container>
      </ParticipatedEventIdUpdater>
    </div>
  );
};
