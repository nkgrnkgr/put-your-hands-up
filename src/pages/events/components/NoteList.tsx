import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { NoteModel } from '../../../models/Note';
import { Note } from '../containers/Note';

interface Props {
  notes: NoteModel[];
}

export const NoteList: FC<Props> = ({ notes }) => (
  <>
    <h1>{notes.length}</h1>
    <Grid container direction="row" justify="flex-start" spacing={2}>
      {notes.map((note, index) => (
        <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Note note={note} />
        </Grid>
      ))}
    </Grid>
  </>
);
