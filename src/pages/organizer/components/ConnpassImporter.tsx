import { Button, TextField, Typography, Theme } from '@material-ui/core';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { GridContainer } from './EditEventForm';
import Loading from '../../shared/components/Loading';
import connpass_logo from '../../../images/connpass_logo.png';
import { makeStyles, createStyles } from '@material-ui/styles';

interface Props {
  isLoading: boolean;
  error: Error | null;
  handleChange: (value: string) => void;
  onClickImport: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      margin: theme.spacing(1),
      maxWidth: '40px',
    },
    error: {
      color: 'red',
    },
  }),
);

export const ConnpassImporter: React.FC<Props> = ({
  isLoading,
  error,
  handleChange,
  onClickImport,
}) => {
  const classes = useStyles();

  return (
    <>
      <GridContainer
        label={
          <div className={classes.label}>
            <Typography component="p">Import From</Typography>
            <img src={connpass_logo} className={classes.image} />
          </div>
        }
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
          isLoading ? (
            <Loading />
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onClickImport()}
            >
              インポート
            </Button>
          )
        }
      />
      <GridContainer
        label={<></>}
        formInput={
          <div className={classes.error}>{error && <>{error.message}</>}</div>
        }
      />
    </>
  );
};
