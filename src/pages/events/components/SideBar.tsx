import { Drawer, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React, { FC } from 'react';
import { EventModel } from '../../../models/Event';
import { ModalBase } from '../../shared/components/ModalBase';
import { SideBarForm } from '../containers/SideBarForm';
import { SideBarItem } from './SideBarItems';

const useStyles = makeStyles({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
});

interface Props {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
  onClickListItem: (pathname: string) => void;
  onClickEdit: (index: number) => void;
  onClickDelete: (index: number) => void;
  onClickAdd: () => void;
  event: EventModel;
  clickedSideBarItemIndex: number | null;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const SideBar: FC<Props> = ({
  isSidebarOpen,
  toggleSideBar,
  onClickListItem,
  onClickAdd,
  onClickDelete,
  onClickEdit,
  event,
  clickedSideBarItemIndex,
  isModalOpen,
  onCloseModal,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const widerThenMobile = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {widerThenMobile ? (
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
        >
          <SideBarItem
            lts={event.lts}
            onClickListItem={onClickListItem}
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
            lts={event.lts}
            onClickListItem={onClickListItem}
            onClickEditMenu={onClickEdit}
            onClickDeletetMenu={onClickDelete}
            onClickAdd={onClickAdd}
          />
        </Drawer>
      )}
      <ModalBase open={isModalOpen} onClose={onCloseModal}>
        <SideBarForm
          event={event}
          index={clickedSideBarItemIndex}
          closeModal={onCloseModal}
        />
      </ModalBase>
    </>
  );
};
