import React from 'react';
import { GridContainer } from './GridContainer';
import { Typography, TextField, Button } from '@material-ui/core';
import { LTModel } from '../../../models/Event';
import { FormikProps } from 'formik';

type Props = {
  index: number;
} & FormikProps<LTModel>;

export const EditLTForm: React.FC<Props> = ({
  values,
  index,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <GridContainer
        label={<Typography component="p">登壇タイトル</Typography>}
        formInput={
          <TextField
            name={`lts.${index}.title`}
            value={values.title}
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
            value={values.speakerName}
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
            value={values.documentUrl1}
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
            value={values.documentUrl2}
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
            value={values.documentUrl3}
            placeholder="https://www.nkgr.app"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        }
      />
      <GridContainer
        label={<></>}
        formInput={
          <>
            <Button variant="outlined" color="primary" type="submit">
              保存
            </Button>
            <Button variant="outlined" color="inherit">
              キャンセル
            </Button>
          </>
        }
      />
    </form>
  );
};
