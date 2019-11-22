import {
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Icon,
  Link,
  Divider,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { LTModel } from '../../../models/Event';
import { IconLink } from '../../shared/components/IconLink';
import clsx from 'clsx';

interface Props {
  eventId: string;
  lts: LTModel[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(1, 1),
    },
    title: {
      margin: theme.spacing(1),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    icon: {
      padding: theme.spacing(1),
    },
    iconSmall: {
      padding: theme.spacing(0.5),
      fontSize: '14px',
    },
    linkText: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '100%',
      textOverflow: 'ellipsis',
    },
  }),
);

interface DocumentListProps {
  documentList: string[];
}

export const LtTopics: React.FC<Props> = ({ eventId, lts }) => {
  const classes = useStyles();
  const history = useHistory();

  const DocumentList: React.FC<DocumentListProps> = ({ documentList }) => {
    return (
      <List dense>
        {documentList.map((url, index) => {
          if (url) {
            return (
              <ListItem key={index} className={classes.nested}>
                <Link href={url} color="secondary" className={classes.linkText}>
                  {url}
                </Link>
              </ListItem>
            );
          }

          return <></>;
        })}
      </List>
    );
  };

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          セッション - 登壇者情報
        </Typography>
        <Divider />
        <List dense component="nav" aria-label="visited event list">
          {lts.map((lt, index) => (
            <>
              <ListItem
                button
                key={lt.title}
                onClick={() =>
                  history.push(`/events/${eventId}/?ltId=${lt.id}`)
                }
              >
                <ListItemIcon>
                  <IconLink
                    title={lt.title}
                    className={clsx(classes.icon, 'fas fa-chalkboard-teacher')}
                  />
                </ListItemIcon>
                <ListItemText primary={lt.title} secondary={lt.speakerName} />
              </ListItem>
              <DocumentList
                documentList={[
                  lt.documentUrl1,
                  lt.documentUrl2,
                  lt.documentUrl3,
                ]}
              />
              {lts.length !== index + 1 && <Divider />}
            </>
          ))}
        </List>
      </Paper>
    </>
  );
};
