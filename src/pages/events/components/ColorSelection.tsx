import {
  createStyles,
  Icon,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import React from 'react';
import { CirclePicker } from 'react-color';
import { COLOR_HEX, NoteContentsModel } from '../../../models/Note';

type Props = FormikProps<NoteContentsModel>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    titleIcon: {
      fontSize: '24px',
      alignItems: 'baseline',
      paddingLeft: theme.spacing(1),
    },
  }),
);

export const ColorSelection: React.FC<Props> = props => {
  const { values, setFieldValue } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6" component="p">
        BackGroundColor
        <Icon
          className={clsx('fas fa-sticky-note', classes.titleIcon)}
          style={{ color: values.color }}
        />
      </Typography>
      <CirclePicker
        colors={COLOR_HEX}
        width={'100%'}
        onChange={({ hex }) => setFieldValue('color', hex)}
      />
    </div>
  );
};
