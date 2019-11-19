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
} from '@material-ui/core';
import queryString, { ParsedQuery } from 'query-string';
import { useLocation } from 'react-router';
import { LTModel } from '../../../models/Event';

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
          </ListItem>
        ))}
      </List>
    </>
  );
};
