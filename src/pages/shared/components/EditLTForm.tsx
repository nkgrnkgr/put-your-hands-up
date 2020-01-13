import React from 'react';
import { GridContainer } from './GridContainer';
import { Typography, TextField } from '@material-ui/core';
import { LTModel } from '../../../models/Event';
import { FormikProps } from 'formik';

type Props = {
  lt: LTModel;
  index: number;
} & FormikProps<LTModel>;

export const EditLTForm: React.FC<Props> = ({ lt, index, handleChange }) => {
  return (
    <div>
      <GridContainer
        label={<Typography component="p">登壇タイトル</Typography>}
        formInput={
          <TextField
            name={`lts.${index}.title`}
            value={lt.title}
            placeholder="Firebaseの効果的な運用方法"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        }
      />
      <GridContainer
        label={<Typography component="p">登壇者</Typography>}
        formInput={
          <TextField
            name={`lts.${index}.speakerName`}
            value={lt.speakerName}
            placeholder="@nkgrnkgr"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
          />
        }
      />
      <GridContainer
        label={<Typography component="p">リンク1</Typography>}
        formInput={
          <TextField
            name={`lts.${index}.documentUrl1`}
            value={lt.documentUrl1}
            placeholder="https://twitter.com/nkgrnkgr"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        }
      />
      <GridContainer
        label={<Typography component="p">リンク2</Typography>}
        formInput={
          <TextField
            name={`lts.${index}.documentUrl2`}
            value={lt.documentUrl2}
            placeholder="https://speakerdeck.com/undefined_name"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        }
      />
      <GridContainer
        label={<Typography component="p">リンク3</Typography>}
        formInput={
          <TextField
            name={`lts.${index}.documentUrl3`}
            value={lt.documentUrl3}
            placeholder="https://www.nkgr.app"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        }
      />
      {/* <GridContainer
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
      /> */}
    </div>
  );
};
