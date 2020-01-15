import React, { useContext, useState } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { SideBar as SideBarComponent } from '../components/SideBar';
import { LTModel } from '../../../models/Event';
import { useHistory } from 'react-router';
import { ConfirmDialogContext } from '../../../contexts/ConfirmDialogContext';

interface Props {
  lts: LTModel[];
}

export const SideBar = (props: Props) => {
  const { lts } = props;
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );
  const { callConfirmDialog } = useContext(ConfirmDialogContext);

  const toggleSideBar = () => {
    setApplicationValues({
      ...applicationValues,
      isSidebarOpen: !applicationValues.isSidebarOpen,
    });
  };

  const history = useHistory();

  const onClickListItem = (pathname: string) => {
    toggleSideBar();
    history.push(pathname);
  };

  const [clickedSideBarItemIndex, setClickedSideBarItemIndex] = useState<
    number | null
  >(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const onClickEdit = (index: number) => {
    setModalOpen(true);
    setClickedSideBarItemIndex(index);
  };

  const onClickDelete = (index: number) => {
    setClickedSideBarItemIndex(index);
    callConfirmDialog(
      '本当に削除しますか？',
      () => alert('deleted'),
      () => alert('canceled'),
    );
  };

  const onClickAdd = () => {
    setModalOpen(true);
    setClickedSideBarItemIndex(null);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <SideBarComponent
      isSidebarOpen={applicationValues.isSidebarOpen}
      toggleSideBar={toggleSideBar}
      onClickListItem={onClickListItem}
      onClickAdd={onClickAdd}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      lts={lts}
      clickedSideBarItemIndex={clickedSideBarItemIndex}
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
    />
  );
};
