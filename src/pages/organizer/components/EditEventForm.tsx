import {
  Button,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
  Divider,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Field, FormikProps, FieldArray } from 'formik';
import React from 'react';
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router';
import { EventModel, createInitialLTModelValue } from '../../../models/Event';

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
    label: {
      textAlign: 'right',
      paddingRight: theme.spacing(2),
    },
    input: {
      padding: theme.spacing(2),
      border: '0.5px solid',
      borderColor: 'rgba(196, 196, 196)',
      width: '70%',
      fontSize: '16px',
      color: 'rgba(196, 196, 196)',
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface GridProps {
  label: React.ReactElement;
  formInput: React.ReactElement;
}

const GridContainer: React.FC<GridProps> = ({ label, formInput }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={12} sm={2}>
        {label}
      </Grid>
      <Grid item xs={12} sm={10}>
        {formInput}
      </Grid>
    </Grid>
  );
};

export const EditLTForm: React.FC<Props> = ({
  values,
  handleSubmit,
  handleChange,
  setFieldValue,
}) => {
  const classes = useStyles();

  return (
    <>
      <FieldArray
        name="lts"
        render={arrayHelper => {
          return (
            <>
              {values.lts.length > 0 ? (
                values.lts.map((lt, index) => (
                  <>
                    <GridContainer
                      label={
                        <Typography component="p">登壇タイトル</Typography>
                      }
                      formInput={
                        <TextField
                          name={`lts.${index}.title`}
                          value={lt.title}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                        />
                      }
                    />
                  </>
                ))
              ) : (
                <></>
              )}
              <GridContainer
                label={<></>}
                formInput={
                  <Button
                    variant="outlined"
                    onClick={() =>
                      arrayHelper.push(createInitialLTModelValue())
                    }
                    color="primary"
                    className={classes.contents}
                  >
                    登壇情報を追加
                  </Button>
                }
              />
            </>
          );
        }}
      />
    </>
  );
};

export const EditEventForm: React.FC<Props> = props => {
  const { values, handleSubmit, handleChange, setFieldValue } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <div className={classes.contents}>
          <GridContainer
            label={<Typography component="p">イベント名</Typography>}
            formInput={
              <TextField
                name="name"
                value={values.name}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            }
          />
        </div>
        <div className={classes.contents}>
          <GridContainer
            label={<Typography component="p">開催日時</Typography>}
            formInput={
              <>
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
              </>
            }
          />
        </div>
        <div className={classes.contents}>
          <Divider />
        </div>
        <div className={classes.contents}>
          <EditLTForm {...props} />
        </div>
        <div>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            className={classes.button}
          >
            更新
          </Button>
          <Button
            type="button"
            color="inherit"
            variant="outlined"
            className={classes.button}
            onClick={() => history.push('/organizer')}
          >
            キャンセル
          </Button>
        </div>
      </form>
    </Paper>
  );
};
