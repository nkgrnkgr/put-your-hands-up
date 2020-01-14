import {
  Backdrop,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Paper,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { EditLTForm } from '../../shared/containers/EditLTForm';
import { LTModel } from '../../../models/Event';

interface OuterProps {
  clickedLTIndex: number;
  lt: LTModel;
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
  const { open, onClose, clickedLTIndex, lt } = props;

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
          <EditLTForm lt={lt} index={clickedLTIndex} />
        </Paper>
      </Fade>
    </Modal>
  );
};
