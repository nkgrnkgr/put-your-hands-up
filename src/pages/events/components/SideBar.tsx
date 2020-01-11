import {
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { LTModel } from '../../../models/Event';
import { SideBarItem } from './SideBarItems';
import { ModalLTForm } from './ModalLTForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    toolbar: theme.mixins.toolbar,
  }),
);

interface Props {
  lts: LTModel[];
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}

export const SideBar: FC<Props> = ({ lts, isSidebarOpen, toggleSideBar }) => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const widerThenMobile = useMediaQuery(theme.breakpoints.up('sm'));

  const changePath = (pathname: string) => {
    toggleSideBar();
    history.push(pathname);
  };

  return (
    <>
      {widerThenMobile ? (
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
        >
          <div className={classes.toolbar} />
          <SideBarItem lts={lts} onClickListItem={changePath} />
        </Drawer>
      ) : (
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          open={isSidebarOpen}
          onClose={() => toggleSideBar()}
        >
          <SideBarItem lts={lts} onClickListItem={changePath} />
        </Drawer>
      )}
      <ModalLTForm
        open
        onClose={() => {
          console.error('');
        }}
      />
    </>
  );
};
