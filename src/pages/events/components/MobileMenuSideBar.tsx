import {
  createStyles,
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    listItemIcon: {
      minWidth: '0px',
      paddingRight: theme.spacing(1),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

interface Props {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}

export const MobileMenuSideBar: FC<Props> = ({
  isSidebarOpen,
  toggleSideBar,
}) => {
  const classes = useStyles();

  return (
    <>
      <Hidden smUp>
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          open={isSidebarOpen}
          onClose={() => toggleSideBar()}
          anchor="right"
        >
          <List>
            <ListItem>
              <ListItemIcon className={classes.listItemIcon}>
                <Icon className="far fa-comment-dots" />
              </ListItemIcon>
              <ListItemText primary="スレッド" />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};
