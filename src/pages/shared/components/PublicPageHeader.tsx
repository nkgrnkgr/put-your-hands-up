import {
  createStyles,
  Drawer,
  Hidden,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import React, { useState } from 'react';
import { HideOnScroll } from './HideOnScroll';
import {
  PublicHeaderContentsButtons,
  PublicHeaderContentsLinkItems,
  PublicHeaderLogo,
  PublickHeaderMenuBar,
} from './PublicHeaderContents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
    icon: {
      width: '1.2em',
      color: '#000',
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    listItemIcon: {
      minWidth: '0px',
      paddingRight: theme.spacing(1),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export const PublicPageHeader: React.FC = () => {
  const classes = useStyles();
  const [isOpenSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(!isOpenSideBar);
  };

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <Toolbar>
          <PublicHeaderLogo />
          {/* pc tablet */}
          <Hidden xsDown>
            <PublicHeaderContentsButtons />
          </Hidden>

          {/* mobile */}
          <Hidden smUp>
            <PublickHeaderMenuBar handleOnClick={toggleSideBar} />
          </Hidden>
        </Toolbar>
      </HideOnScroll>
      <Hidden smUp>
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          open={isOpenSideBar}
          onClose={() => toggleSideBar()}
          anchor="right"
        >
          <PublicHeaderContentsLinkItems />
        </Drawer>
      </Hidden>
    </div>
  );
};
