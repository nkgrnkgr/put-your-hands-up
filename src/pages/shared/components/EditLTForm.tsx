import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { LTModel } from '../../../models/Event';
import { GridContainer } from './GridContainer';

interface Props {
  namePrefix?: string;
  lt: LTModel;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

export const EditLTForm: React.FC<Props> = ({
  namePrefix = '',
  lt,
  handleChange,
}) => {
  return (
    <>
      <GridContainer
        label={<Typography component="p">登壇タイトル</Typography>}
        formInput={
          <TextField
            name={`${namePrefix}title`}
            value={lt.title}
            placeholder="Firebaseの効果的な運用方法"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
          />
        }
      />
      <GridContainer
        label={<Typography component="p">登壇者</Typography>}
        formInput={
          <TextField
            name={`${namePrefix}speakerName`}
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
            name={`${namePrefix}documentUrl1`}
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
            name={`${namePrefix}documentUrl2`}
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
            name={`${namePrefix}documentUrl3`}
            value={lt.documentUrl3}
            placeholder="https://www.nkgr.app"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        }
      />
    </>
  );
};
