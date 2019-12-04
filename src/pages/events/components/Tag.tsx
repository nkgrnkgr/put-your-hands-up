import { Chip, Icon, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

interface Props {
  tagTitle: string;
  onClick?: (event: any) => void;
  onClickDelete?: (event: any) => void;
}

export const Tag: React.FC<Props> = ({ tagTitle, onClick, onClickDelete }) => {
  const classes = useStyles();

  return (
    <Chip
      icon={<Icon className={clsx('fas fa-tag', classes.tagIcon)} />}
      className={classes.tag}
      label={tagTitle}
      clickable
      color="secondary"
      onClick={onClick}
      onDelete={onClickDelete}
      deleteIcon={
        <Icon className={clsx('far fa-times-circle', classes.tagIcon)} />
      }
    />
  );
};
