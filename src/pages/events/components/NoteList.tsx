import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { NoteModel } from '../../../models/Note';
import { Note } from '../containers/Note';
import { EmptyContents } from '../../shared/containers/EmptyContents';

interface Props {
  notes: NoteModel[];
}

export const NoteList: FC<Props> = ({ notes }) => {
  if (notes && notes.length > 0) {
    return (
      <Grid container direction="row" justify="flex-start" spacing={2}>
        {notes.map((note, index) => (
          <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Note note={note} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return <EmptyContents message="投稿がありません" />;
};
