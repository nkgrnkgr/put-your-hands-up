import {
  Button,
  createStyles,
  Icon,
  IconButton,
  makeStyles,
  Theme,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonBase,
  Typography,
  List,
  Divider,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router';
import logo from '../../../images/pyhuloge_pink.svg';

export type LinkContent = {
  title: string;
  iconClassName: string;
  url: string;
};

const linkContents: LinkContent[] = [
  {
    title: 'HowToUse',
    iconClassName: 'fab fa-readme',
    url: '/howtouse',
  },
  {
    title: 'Demo',
    iconClassName: 'fas fa-desktop',
    url: `events/${process.env.REACT_APP_DEMO_EVENTID}`,
  },
  {
    title: 'Github',
    iconClassName: 'fab fa-github',
    url: 'https://github.com/nkgrnkgr/put-your-hands-up',
  },
];

const contacts: LinkContent[] = [
  {
    title: 'Twitter',
    iconClassName: 'fab fa-twitter',
    url: 'https://twitter.com/pyhu10',
  },
  {
    title: 'Mail',
    iconClassName: 'far fa-envelope',
    url: 'mailto:nkgrnkgr.put.your.hands.up@gmail.com',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      flexGrow: 1,
    },
    logoImage: {
      margin: theme.spacing(1),
      witdh: '30px',
      height: '30px',
    },
    title: {
      flexGrow: 1,
      fontFamily: 'Josefin Sans,sans-serif',
      fontWeight: 'lighter',
      cursor: 'pointer',
      color: theme.palette.primary.main,
    },
    icon: {
      color: '#000',
      width: '1.3em',
    },
    button: {
      textTransform: 'none',
      marginRight: theme.spacing(1),
    },
    listItemIcon: {
      minWidth: '0px',
      paddingRight: theme.spacing(1),
    },
  }),
);

interface Props {
  link: LinkContent;
}

export const PublicHeaderLogo = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.logo}>
      <ButtonBase>
        <img alt="logo" src={logo} className={classes.logoImage} />
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => history.push('/')}
        >
          PutYourHandsUp
        </Typography>
      </ButtonBase>
    </div>
  );
};

export const PublicHeaderContentsButtons = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {linkContents.map(link => (
        <LinkButton key={link.title} link={link} />
      ))}
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={() => history.push('/dashboard')}
      >
        GETSTARTED
      </Button>
    </>
  );
};

export const PublicHeaderContentsLinkItems = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className="fas fa-paperclip" />
          </ListItemIcon>
          <ListItemText primary="links" />
        </ListItem>
        <Divider />
        {linkContents.map(link => (
          <LinkListItem key={link.title} link={link} />
        ))}
        <ListItem>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => history.push('/dashboard')}
          >
            GETSTARTED
          </Button>
        </ListItem>
        <Divider />
        {contacts.map(contact => (
          <LinkListItem key={contact.title} link={contact} />
        ))}
      </List>
    </>
  );
};

const LinkButton: React.FC<Props> = props => {
  const classes = useStyles();
  const history = useHistory();
  const { link } = props;

  const handleOnClick = (url: string) => {
    if (url.match(/^http/)) {
      window.location.href = url;

      return;
    }
    history.push(url);
  };

  return (
    <Button
      key={link.title}
      variant="text"
      className={classes.button}
      startIcon={<Icon className={clsx(link.iconClassName, classes.icon)} />}
      onClick={() => handleOnClick(link.url)}
    >
      {link.title}
    </Button>
  );
};

interface MenuBarProps {
  handleOnClick: () => void;
}

export const PublickHeaderMenuBar: React.FC<MenuBarProps> = ({
  handleOnClick,
}) => {
  const classes = useStyles();

  return (
    <IconButton onClick={handleOnClick}>
      <Icon className={clsx('fas fa-bars', classes.icon)} />
    </IconButton>
  );
};

const LinkListItem: React.FC<Props> = props => {
  const classes = useStyles();
  const history = useHistory();
  const { link } = props;
  const handleOnClick = (url: string) => {
    if (url.match(/^http/)) {
      window.location.href = url;

      return;
    }
    history.push(url);
  };

  return (
    <ListItem>
      <ListItemIcon
        className={classes.listItemIcon}
        onClick={() => handleOnClick(link.url)}
      >
        <Icon className={clsx(link.iconClassName, classes.icon)} />
      </ListItemIcon>
      <ListItemText primary={link.title} />
    </ListItem>
  );
};
