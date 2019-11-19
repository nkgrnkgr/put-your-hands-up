import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Link,
  Avatar,
  Typography,
  Container,
} from '@material-ui/core';
import logo from '../../../images/pyhuloge_pink.svg';
import { IconLinkWithText } from './IconLinkWtihText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
      background: '#232b33',
    },
    avatar: {
      height: '80px',
      width: '80px',
    },
    item: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(1),
      color: '#fff',
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  }),
);

export const PageFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={3} className={classes.item}>
            <Link href="/">
              <Avatar alt="gtc" src={logo} className={classes.avatar} />
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.item}>
            <Typography component="p" className={classes.title}>
              About
            </Typography>
            <div>
              <IconLinkWithText
                title="About this page"
                className="fas fa-home"
                url="/"
              />
            </div>
            <div>
              <IconLinkWithText
                title="About me"
                className="fas fa-user"
                url="https://www.nkgr.app"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.item}>
            <Typography
              component="p"
              color="textPrimary"
              className={classes.title}
            >
              Links
            </Typography>
            <div>
              <IconLinkWithText
                title="Github"
                className="fab fa-github"
                url="https://github.com/nkgrnkgr/put-your-hands-up/"
              />
            </div>
            <div>
              <IconLinkWithText
                title="Terms"
                className="far fa-file-alt"
                url="/"
              />
            </div>
            <div>
              <IconLinkWithText
                title="Privacy"
                className="far fa-address-card"
                url="/"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.item}>
            <Typography
              component="p"
              color="textPrimary"
              className={classes.title}
            >
              Contact
            </Typography>
            <div>
              <IconLinkWithText
                title="Twitter"
                className="fab fa-twitter"
                url="https://twitter.com/pyhu10"
              />
            </div>
            <div>
              <IconLinkWithText
                title="Email"
                className="far fa-envelope"
                url="mailto:nkgrnkgr.put.your.hands.up@gmail.com"
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
