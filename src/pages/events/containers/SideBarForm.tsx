import React from 'react';
import { Formik } from 'formik';
import {
  LTModel,
  createInitialLTModelValue,
  EventModel,
} from '../../../models/Event';
import { SideBarForm as Component } from '../components/SideBarForm';
import { updateEvent } from '../../../firebase/api/events';

interface OuterProps {
  event: EventModel;
  index: number | null;
  closeModal: () => void;
}

export const SideBarForm = (props: OuterProps) => {
  const { event, index, closeModal } = props;

  const onSubmit = async (values: LTModel) => {
    const updatedLTs = [...event.lts];
    updatedLTs[index !== null ? index : event.lts.length] = values;
    const updatedEvent: EventModel = { ...event, lts: updatedLTs };

    await updateEvent(updatedEvent);
    closeModal();
  };

  const initialValues =
    index !== null ? event.lts[index] : createInitialLTModelValue();

  const onClickCancel = () => {
    closeModal();
  };

  const onClickDelete = async () => {
    if (index !== null) {
      const lts = [...event.lts];
      lts.splice(index, 1);
      const updatedEvent: EventModel = { ...event, lts };

      await updateEvent(updatedEvent);
    }

    closeModal();
  };

  const shouldShowDeleteButton = index !== null;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={formikProps => (
        <Component
          {...formikProps}
          onClickDeleteButton={onClickDelete}
          onClickCancelButton={onClickCancel}
          shouldShowDeleteButton={shouldShowDeleteButton}
        />
      )}
    />
  );
};
