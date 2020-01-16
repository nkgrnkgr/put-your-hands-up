import {
  createStyles,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { LTModel } from '../../../models/Event';
import { IconLink } from '../../shared/components/IconLink';

interface Props {
  eventId: string;
  lt: LTModel;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 800,
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

const DocumentList: React.FC<DocumentListProps> = ({ documentList }) => {
  const classes = useStyles();

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

export const LtTopics: React.FC<Props> = ({ lt }) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          Sessions - 登壇者情報
        </Typography>
        <Divider />
        <List dense component="nav" aria-label="visited event list">
          <>
            <ListItem key={lt.title}>
              <ListItemIcon>
                <IconLink
                  title={lt.title}
                  className={clsx(classes.icon, 'fas fa-chalkboard-teacher')}
                />
              </ListItemIcon>
              <ListItemText primary={lt.title} secondary={lt.speakerName} />
            </ListItem>
            <DocumentList
              documentList={[lt.documentUrl1, lt.documentUrl2, lt.documentUrl3]}
            />
          </>
        </List>
      </Paper>
    </>
  );
};
