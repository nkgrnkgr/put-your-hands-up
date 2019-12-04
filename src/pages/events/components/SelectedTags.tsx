import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { Tag } from './Tag';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  selectedTags: Set<string>;
  onClickDeleteHander: (tagTitle: string) => void;
}

export const SelectedTags: FC<Props> = ({
  selectedTags,
  onClickDeleteHander,
}) => {
  const tags: string[] = [];
  selectedTags.forEach(tag => {
    tags.push(tag);
  });

  return (
    <>
      {tags.map(tag => (
        <>
          <Tag tagTitle={tag} onClickDelete={() => onClickDeleteHander(tag)} />
        </>
      ))}
    </>
  );
};
