import {
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { LTModel, createInitialLTModelValue } from '../../../models/Event';
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

  const [open, setOpen] = useState(false);
  const [clickedLTIndex, setClickedLTIndex] = useState<number | null>(null);
  const onClickEdit = (index: number) => {
    setOpen(true);
    setClickedLTIndex(index);
  };

  const onClickDelete = (index: number) => {
    setOpen(true);
    setClickedLTIndex(index);
  };

  const onClickAdd = () => {
    setOpen(true);
    setClickedLTIndex(null);
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
          <SideBarItem
            lts={lts}
            onClickListItem={changePath}
            onClickEditMenu={onClickEdit}
            onClickDeletetMenu={onClickDelete}
            onClickAdd={onClickAdd}
          />
        </Drawer>
      ) : (
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          open={isSidebarOpen}
          onClose={() => toggleSideBar()}
        >
          <SideBarItem
            lts={lts}
            onClickListItem={changePath}
            onClickEditMenu={onClickEdit}
            onClickDeletetMenu={onClickDelete}
            onClickAdd={onClickAdd}
          />
        </Drawer>
      )}
      <ModalLTForm
        lt={
          clickedLTIndex !== null
            ? lts[clickedLTIndex]
            : createInitialLTModelValue()
        }
        clickedLTIndex={clickedLTIndex || lts.length + 1}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
