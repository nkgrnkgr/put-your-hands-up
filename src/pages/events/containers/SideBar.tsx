import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { ConfirmDialogContext } from '../../../contexts/ConfirmDialogContext';
import { EventModel } from '../../../models/Event';
import { SideBar as SideBarComponent } from '../components/SideBar';
import { updateEvent } from '../../../firebase/api/events';

interface Props {
  event: EventModel;
}

export const SideBar = (props: Props) => {
  const { event } = props;
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
    const lts = [...event.lts];
    lts.splice(index, 1);
    const updatedEvent: EventModel = { ...event, lts };

    callConfirmDialog(
      '本当に削除しますか？',
      () => updateEvent(updatedEvent),
      () => {},
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
      event={event}
      clickedSideBarItemIndex={clickedSideBarItemIndex}
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
    />
  );
};
