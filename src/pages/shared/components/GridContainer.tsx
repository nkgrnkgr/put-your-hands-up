import React from 'react';
import { Grid } from '@material-ui/core';

interface GridProps {
  label: React.ReactElement;
  formInput: React.ReactElement;
}

export const GridContainer: React.FC<GridProps> = ({ label, formInput }) => {
  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={12} sm={3}>
        {label}
      </Grid>
      <Grid item xs={12} sm={9}>
        {formInput}
      </Grid>
    </Grid>
  );
};
