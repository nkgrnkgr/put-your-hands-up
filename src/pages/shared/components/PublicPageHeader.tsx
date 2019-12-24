import {
  AppBar,
  Avatar,
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  ButtonBase,
  Button,
  Icon,
  Fade,
  MenuItem,
  Menu,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
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

export const PublicPageHeader: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <IconButton onClick={handleClick}>
                <Icon className={clsx('fas fa-bars', classes.icon)} />
              </IconButton>
            </Hidden>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem>
                <Typography component="p" color="textSecondary">
                  a
                </Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};
