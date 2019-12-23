import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { FieldArray, FormikProps } from 'formik';
import React, { useState } from 'react';
import { NoteContentsModel } from '../../../models/Note';
import { Tag } from './Tag';

type Props = FormikProps<NoteContentsModel>;

const recommendedTags = [
  '感想',
  '質問',
  '🔰初心者',
  '誰か教えて😂',
  '完全に理解した',
  'マサカリ🔪',
  'この分野に関しては素人ですが',
  'LGTM',
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    tagFormContents: {
      display: 'flex',
      padding: theme.spacing(2),
    },
    tagFormInput: {
      padding: '10px',
      fontSize: '12px',
    },
    tagFormButton: {
      marginLeft: theme.spacing(2),
      color: '#fff',
    },
    tags: {
      marginBottom: theme.spacing(1),
    },
    tag: {
      color: '#fff',
      margin: theme.spacing(0.5),
    },
    tagButton: {
      marginRight: theme.spacing(0.5),
    },
    tagIcon: {
      padding: theme.spacing(0.5),
      fontSize: '14px',
      color: '#fff',
    },
  }),
);

export const TagForm: React.FC<Props> = props => {
  const { values } = props;
  const [text, setText] = useState('');

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FieldArray
        name="tagTitles"
        render={arrayHelpers => (
          <>
            <Typography className={classes.title} variant="h6" component="p">
              Tag
            </Typography>
            <div className={classes.tags}>
              {recommendedTags.map((tag, index) => (
                <Button
                  className={classes.tagButton}
                  key={index}
                  variant="outlined"
                  size="small"
                  onClick={() => arrayHelpers.push(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
            <TextField
              variant="outlined"
              value={text}
              inputProps={{ className: classes.tagFormInput }}
              onChange={event => setText(event.target.value)}
            />
            <Button
              size="small"
              variant="contained"
              className={classes.tagFormButton}
              color="secondary"
              onClick={() => {
                if (text.length > 0) {
                  arrayHelpers.push(text);
                  setText('');
                }
              }}
            >
              追加
            </Button>
            <div className={classes.tags}>
              {values.tagTitles &&
                values.tagTitles.length > 0 &&
                values.tagTitles.map((tagTitle, index) => (
                  <Tag
                    key={index}
                    tagTitle={tagTitle}
                    onClickDelete={() => arrayHelpers.remove(index)}
                  />
                ))}
            </div>
          </>
        )}
      />
    </div>
  );
};
