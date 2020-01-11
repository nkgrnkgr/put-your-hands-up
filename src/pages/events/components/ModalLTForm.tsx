import {
  Backdrop,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { GridContainer } from '../../shared/components/GridContainer';

interface OuterProps {
  open: boolean;
  onClose: () => void;
}

type Props = OuterProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      maxWidth: 900,
      width: '900px',
      padding: theme.spacing(1, 3),
      margin: theme.spacing(1),
    },
  }),
);

export const ModalLTForm: React.FC<Props> = props => {
  const { open, onClose } = props;

  const classes = useStyles();

  return (
    <Modal
      open={open}
      className={classes.root}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onClose={() => onClose()}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <form>
            <GridContainer
              label={<Typography component="p">登壇タイトル</Typography>}
              formInput={
                <TextField
                  name={'title'}
                  value={'aaa'}
                  placeholder="Firebaseの効果的な運用方法"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              }
            />
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};
