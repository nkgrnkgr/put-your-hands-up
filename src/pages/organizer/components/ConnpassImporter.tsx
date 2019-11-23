import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { GridContainer } from './EditEventForm';

interface Props {
  handleChange: (value: string) => void;
  onClickImport: () => void;
}

export const ConnpassImporter: React.FC<Props> = ({
  handleChange,
  onClickImport,
}) => {
  return (
    <>
      <GridContainer
        label={<Typography component="p">Import Data</Typography>}
        formInput={
          <TextField
            label="イベントURL"
            name="name"
            margin="normal"
            fullWidth
            variant="outlined"
            placeholder="https://nodejs.connpass.com/event/147459/"
            onChange={e => handleChange(e.target.value)}
          />
        }
      />
      <GridContainer
        label={<></>}
        formInput={
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onClickImport()}
          >
            インポート
          </Button>
        }
      />
    </>
  );
};
