import {
  Button,
  Divider,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Field, FieldArray, FormikProps } from 'formik';
import React from 'react';
import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router';
import markdown from '../../../images/markdown.svg';
import { createInitialLTModelValue, EventModel } from '../../../models/Event';
import { GridContainer } from '../../shared/components/GridContainer';
import { ConnpassImporter } from '../containers/ConnpassImporter';
import { EditLTForm } from '../../shared/components/EditLTForm';
import { EditButtons } from '../../shared/components/EditButtons';

type OuterProps = {
  handleDelete: (values: EventModel) => void;
};

type Props = FormikProps<EventModel> & OuterProps;
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
    },
    image: {
      maxWidth: '40px',
      marginRight: theme.spacing(1),
    },
    titleImage: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

export const LTForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { values, handleChange } = props;

  return (
    <>
      <FieldArray
        name="lts"
        render={arrayHelper => {
          return (
            <>
              {values.lts.length > 0 ? (
                values.lts.map((lt, index) => (
                  <div key={index}>
                    <EditLTForm
                      index={index}
                      values={lt}
                      handleChange={handleChange}
                    />
                    <GridContainer
                      label={<></>}
                      formInput={
                        <Button
                          variant="outlined"
                          onClick={() => arrayHelper.remove(index)}
                          color="secondary"
                          className={classes.contents}
                        >
                          この登壇情報を削除
                        </Button>
                      }
                    />
                    <Divider className={classes.contents} />
                  </div>
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
  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    handleDelete,
  } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <div className={classes.contents}>
          <ConnpassImporter {...props} />
        </div>
        <div className={classes.contents}>
          <Divider />
        </div>
        <div className={classes.contents}>
          <GridContainer
            label={<Typography component="p">イベント名</Typography>}
            formInput={
              <TextField
                name="name"
                placeholder="Firebase勉強会"
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
            label={
              <div className={classes.titleImage}>
                <Typography component="p">イベント説明</Typography>
                <img src={markdown} alt="markdown" className={classes.image} />
              </div>
            }
            formInput={
              <>
                <TextField
                  name="memo"
                  placeholder="イベント詳細"
                  value={values.memo || ''}
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows="4"
                  rowsMax="15"
                  fullWidth
                  onChange={handleChange}
                />
              </>
            }
          />
        </div>
        <div className={classes.contents}>
          <GridContainer
            label={<Typography component="p">ハッシュタグ</Typography>}
            formInput={
              <TextField
                name="hashTag"
                placeholder="firebase_meetup"
                value={values.hashTag}
                margin="normal"
                variant="outlined"
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
          <LTForm {...props} />
        </div>
        <EditButtons
          onClickCancelButton={() => history.push('/organizer')}
          onClickDeleteButton={() => handleDelete(values)}
          shouldShowDeleteButton={values.id !== ''}
        />
      </form>
    </Paper>
  );
};
