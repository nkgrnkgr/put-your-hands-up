import {
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { FC } from 'react';
import { LTModel } from '../../../models/Event';
import { ModalBase } from '../../shared/components/ModalBase';
import { EditLTForm } from '../../shared/containers/EditLTForm';
import { SideBarItem } from './SideBarItems';

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
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
  onClickListItem: (pathname: string) => void;
  onClickEdit: (index: number) => void;
  onClickDelete: (index: number) => void;
  onClickAdd: () => void;
  lts: LTModel[];
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
  lts,
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
          <div className={classes.toolbar} />
          <SideBarItem
            lts={lts}
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
            lts={lts}
            onClickListItem={onClickListItem}
            onClickEditMenu={onClickEdit}
            onClickDeletetMenu={onClickDelete}
            onClickAdd={onClickAdd}
          />
        </Drawer>
      )}
      <ModalBase open={isModalOpen} onClose={onCloseModal}>
        <EditLTForm lts={lts} index={clickedSideBarItemIndex} />
      </ModalBase>
    </>
  );
};
