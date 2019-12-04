import React, { useContext } from 'react';
import { EventPageContext } from '../../../contexts/EventPageContext';
import { SelectedTags as Compoennt } from '../components/SelectedTags';

export const SelectedTags = () => {
  const { selectedTags, removeTag } = useContext(EventPageContext);

  const onClickDelete = (tagTitle: string) => removeTag(tagTitle);

  return (
    <Compoennt
      selectedTags={selectedTags}
      onClickDeleteHander={onClickDelete}
    />
  );
};
