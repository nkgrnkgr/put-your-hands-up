import React from 'react';
import { Button, Paper, Theme, TextField, Typography } from '@material-ui/core';
import { FormikProps, Field } from 'formik';
import { EventModel } from '../../../models/Event';
import { makeStyles, createStyles } from '@material-ui/styles';
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import clsx from 'clsx';

type Props = FormikProps<EventModel>;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    contents: {
      marginBottom: theme.spacing(2),
    },
    input: {
      padding: theme.spacing(2),
      border: '0.5px solid',
      borderColor: 'rgba(196, 196, 196)',
      width: '70%',
      fontSize: '16px',
      color: 'rgba(196, 196, 196)',
    },
  }),
);
export const EditForm: React.FC<Props> = ({
  values,
  handleSubmit,
  handleChange,
  setFieldValue,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <div className={classes.contents}>
          <Typography component="p">イベント名</Typography>
          <TextField
            name="name"
            value={values.name}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </div>
        <div className={classes.contents}>
          <Typography component="p" className={classes.contents}>
            開催日時
          </Typography>
          <Field name="date" style={{ display: 'none' }} />
          <ReactDatepicker
            selected={new Date(values.date)}
            onChange={date => {
              if (date) {
                setFieldValue('date', date.getTime());
              }
            }}
            showTimeSelect={true}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy/MM/dd HH:mm"
            timeCaption="time"
            className={clsx(classes.input)}
          />
        </div>

        <div>
          <Button type="submit" color="primary" variant="outlined">
            更新
          </Button>
        </div>
      </form>
    </Paper>
  );
};
