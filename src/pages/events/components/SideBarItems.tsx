import {
  createStyles,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import queryString, { ParsedQuery } from 'query-string';
import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { LTModel } from '../../../models/Event';
import { ThreadMenuButton } from './ThreadMenuButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: '0px',
      paddingRight: theme.spacing(1),
    },
  }),
);

interface Props {
  lts: LTModel[];
  onClickListItem: (pathname: string) => void;
  onClickEditMenu: (index: number) => void;
  onClickDeletetMenu: (index: number) => void;
  onClickAdd: () => void;
}

export const SideBarItem: FC<Props> = ({
  lts,
  onClickListItem,
  onClickEditMenu,
  onClickDeletetMenu,
  onClickAdd,
}) => {
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
        {lts.map((l, index) => (
          <ListItem
            button
            key={l.id}
            selected={ltId === l.id}
            onClick={() => onClickListItem(`${location.pathname}?ltId=${l.id}`)}
          >
            <ListItemText primary={`#${l.title}`} />
            <ListItemSecondaryAction>
              <ThreadMenuButton
                onClickEditMenu={() => onClickEditMenu(index)}
                onClickDeleteMenu={() => onClickDeletetMenu(index)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={() => onClickAdd()}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className="fas fa-plus" />
          </ListItemIcon>
          <ListItemText primary="スレッドを追加" />
        </ListItem>
      </List>
    </>
  );
};
