import React from 'react';
import {
  createStyles,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ReplyComments } from '../containers/ReplyComments';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 350,
    },
    listItemIcon: {
      minWidth: '0px',
      paddingRight: theme.spacing(0.5),
    },
  }),
);

interface Props {
  isOpen: boolean;
  handleOnCloseDrawer: () => void;
}

export const RightSideBar: React.FC<Props> = ({
  isOpen,
  handleOnCloseDrawer,
}) => {
  const classes = useStyles();

  return (
    <Drawer open={isOpen} onClose={handleOnCloseDrawer} anchor="right">
      <div role="presentation" className={classes.list}>
        <List>
          <ListItem button onClick={() => handleOnCloseDrawer()}>
            <ListItemIcon className={classes.listItemIcon}>
              <Icon className="fas fa-angle-left" />
            </ListItemIcon>
            <ListItemText primary="閉じる" />
          </ListItem>
          <Divider />
          <ReplyComments />
        </List>
      </div>
    </Drawer>
  );
};
