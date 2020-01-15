import React from 'react';
import { Button, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

interface EditButtonsProps {
  onClickSaveButton?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onClickCancelButton?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onClickDeleteButton?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  shouldShowDeleteButton?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroup: {
      display: 'flex',
    },
    flexGrow: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export const EditButtons: React.FC<EditButtonsProps> = (
  props: EditButtonsProps,
) => {
  const classes = useStyles();
  const {
    onClickSaveButton,
    onClickCancelButton,
    onClickDeleteButton,
    shouldShowDeleteButton,
  } = props;

  return (
    <div className={classes.buttonGroup}>
      <div>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={onClickSaveButton}
        >
          保存
        </Button>
      </div>
      <div className={classes.flexGrow}>
        <Button
          type="button"
          color="inherit"
          variant="outlined"
          className={classes.button}
          onClick={onClickCancelButton}
        >
          キャンセル
        </Button>
      </div>
      {shouldShowDeleteButton && (
        <div>
          <Button
            type="button"
            color="primary"
            variant="outlined"
            className={classes.button}
            onClick={onClickDeleteButton}
          >
            削除
          </Button>
        </div>
      )}
    </div>
  );
};
