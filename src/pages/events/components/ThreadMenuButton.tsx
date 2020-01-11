import {
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';

const useStyles = makeStyles(
  createStyles({
    icon: {
      fontSize: '1.2em',
    },
  }),
);

interface Props {
  onClickEditMenu: () => void;
  onClickDeleteMenu: () => void;
}

export const ThreadMenuButton: FC<Props> = props => {
  const { onClickEditMenu, onClickDeleteMenu: onClickDeleteButton } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickEdit = () => {
    handleClose();
    onClickEditMenu();
  };

  const onClickDelete = () => {
    handleClose();
    onClickDeleteButton();
  };

  return (
    <>
      <IconButton
        className={clsx('fas fa-ellipsis-v', classes.icon)}
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onClickEdit}>編集</MenuItem>
        <MenuItem onClick={onClickDelete}>削除</MenuItem>
      </Menu>
    </>
  );
};
