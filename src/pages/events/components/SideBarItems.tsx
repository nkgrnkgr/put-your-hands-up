import React, { FC } from 'react';
import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Icon,
  ListItemIcon,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import queryString, { ParsedQuery } from 'query-string';
import { useLocation } from 'react-router';
import { LTModel } from '../../../models/Event';
import clsx from 'clsx';
import { ThreadMenuButton } from './ThreadMenuButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: '0px',
      paddingRight: theme.spacing(1),
    },
    listItemRightIcon: {
      fontSize: '1.2em',
    },
  }),
);

interface Props {
  lts: LTModel[];
  onClickListItem: (pathname: string) => void;
}

export const SideBarItem: FC<Props> = ({ lts, onClickListItem }) => {
  const classes = useStyles();
  const location = useLocation();
  const params: ParsedQuery<string> = queryString.parse(location.search);
  const { ltId } = params;

  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className="far fa-comment-dots" />
          </ListItemIcon>
          <ListItemText primary="スレッド" />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={!ltId || ltId === '0'}
          onClick={() => onClickListItem(location.pathname)}
        >
          <ListItemText primary="#general" />
        </ListItem>
        {lts.map(l => (
          <ListItem
            button
            key={l.id}
            selected={ltId === l.id}
            onClick={() => onClickListItem(`${location.pathname}?ltId=${l.id}`)}
          >
            <ListItemText primary={`#${l.title}`} />
            <ListItemSecondaryAction onClick={() => console.error('called2')}>
              <ThreadMenuButton
                onClickEditMenu={() => {
                  console.error('edit');
                }}
                onClickDeleteButton={() => {
                  console.error('delete');
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={() => console.error('called1')}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className="fas fa-plus" />
          </ListItemIcon>
          <ListItemText primary="スレッドを追加" />
        </ListItem>
      </List>
    </>
  );
};
