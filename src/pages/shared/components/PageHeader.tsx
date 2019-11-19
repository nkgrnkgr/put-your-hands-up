import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  Fade,
  ListItemText,
  Divider,
} from '@material-ui/core';
import clsx from 'clsx';
import logo from '../../../images/pyhuloge_white.svg';
import { HideOnScroll } from './HideOnScroll';
import { IconLink } from './IconLink';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { UserModel } from '../../../models/User';
import { signOut } from '../../../firebase/api/authenticator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
    avatar: {
      margin: theme.spacing(1),
    },
    link: {
      color: '#fff',
    },
    title: {
      flexGrow: 1,
      fontFamily: 'Josefin Sans,sans-serif',
      fontWeight: 'lighter',
      cursor: 'pointer',
    },
    toolbarMobile: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
    avatarSmall: {
      width: '25px',
      height: '25px',
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  user: UserModel;
  toggleSideBar: () => void;
}

export const PageHeader: React.FC<Props> = ({ user, toggleSideBar }) => {
  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    history.push('/');
  };

  const Logo = () => (
    <Link to="/dashboard">
      <Avatar alt="gtc" src={logo} className={classes.avatar} />
    </Link>
  );

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            {/* mobile */}
            <Hidden smUp>
              <div className={classes.toolbarMobile}>
                <IconLink
                  title="github"
                  className={clsx('fas fa-bars', classes.link)}
                  onClick={() => toggleSideBar()}
                />
                <Logo />
                <Tooltip title={user.displayName}>
                  <IconButton color="inherit" onClick={handleClick}>
                    <Avatar
                      alt={user.displayName}
                      src={user.avatarUrl}
                      className={classes.avatarSmall}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </Hidden>
            {/* pc tablet */}
            <Hidden xsDown>
              <Logo />
              <Typography
                variant="h5"
                className={classes.title}
                onClick={() => history.push('/dashboard')}
              >
                PutYourHandsUp
              </Typography>
              <IconLink
                title="github"
                url="https://github.com/nkgrnkgr/put-your-hands-up"
                className={clsx('fab fa-github', classes.link)}
              />
              <Tooltip title="profile">
                <IconButton color="inherit" onClick={handleClick}>
                  <Avatar
                    alt={user.displayName}
                    src={user.avatarUrl}
                    className={classes.avatarSmall}
                  />
                </IconButton>
              </Tooltip>
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
                  Sign in as <b>{user.displayName}</b>
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => history.push('/setting')}>
                <ListItemText primary="Settings" />
              </MenuItem>
              <MenuItem onClick={() => history.push('/dashboard')}>
                <ListItemText primary="DashBoard" />
              </MenuItem>
              <MenuItem onClick={() => history.push('/organizer')}>
                <ListItemText primary="Organizer" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSignOut()}>
                <ListItemText primary="SignOut" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};
