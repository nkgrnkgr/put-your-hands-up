import {
  AppBar,
  Avatar,
  Button,
  ButtonBase,
  createStyles,
  Hidden,
  Icon,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router';
import logo from '../../../images/pyhuloge_white.svg';
import { HideOnScroll } from './HideOnScroll';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      flexGrow: 1,
    },
    avatar: {
      margin: theme.spacing(1),
    },
    icon: {
      width: '1.2em',
      color: '#fff',
    },
    button: {
      color: '#fff',
      textTransform: 'none',
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      fontFamily: 'Josefin Sans,sans-serif',
      fontWeight: 'lighter',
      cursor: 'pointer',
      color: '#fff',
    },
  }),
);

interface Props {
  onClickMenuBar: () => void;
}

export const PublicPageHeader: React.FC<Props> = ({ onClickMenuBar }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <div className={classes.logo}>
              <ButtonBase>
                <Avatar alt="gtc" src={logo} className={classes.avatar} />
                {/* pc tablet */}
                <Hidden xsDown>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    onClick={() => history.push('/dashboard')}
                  >
                    PutYourHandsUp
                  </Typography>
                </Hidden>
              </ButtonBase>
            </div>

            {/* pc tablet */}
            <Hidden xsDown>
              <Button
                variant="text"
                className={classes.button}
                startIcon={
                  <Icon className={clsx('fab fa-readme', classes.icon)} />
                }
              >
                HowToUse
              </Button>
              <Button
                variant="text"
                className={classes.button}
                startIcon={
                  <Icon className={clsx('fas fa-desktop', classes.icon)} />
                }
              >
                Demo
              </Button>
              <Button
                variant="text"
                className={classes.button}
                startIcon={
                  <Icon className={clsx('fab fa-github', classes.icon)} />
                }
              >
                Github
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                className={classes.button}
              >
                GETSTARTED
              </Button>
            </Hidden>

            {/* mobile */}
            <Hidden smUp>
              <IconButton onClick={onClickMenuBar}>
                <Icon className={clsx('fas fa-bars', classes.icon)} />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};
