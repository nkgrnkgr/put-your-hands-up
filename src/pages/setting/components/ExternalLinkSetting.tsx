import React from 'react';
import {
  createStyles,
  FormControlLabel,
  Grid,
  Icon,
  Link,
  makeStyles,
  Switch,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { TwitterIntegration } from '../../../models/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    contents: {
      marginBottom: theme.spacing(2),
    },
    title: {
      marginTop: theme.spacing(1),
    },
    item: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    status: {
      alignItems: 'center',
    },
  }),
);

interface Props {
  twitterIntegration?: TwitterIntegration;
  onChangeSettingTwitterIntegration: (isIntegrating: boolean) => {};
}

export const ExternalLinkSetting: React.FC<Props> = ({
  twitterIntegration,
  onChangeSettingTwitterIntegration,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={clsx(classes.item, classes.contents)}>
          <Typography variant="h6">外部サービス連携</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={4}
          className={clsx(classes.item, classes.contents, classes.title)}
        >
          <div className={classes.icon}>
            <Icon className="fab fa-twitter" color="secondary" />
          </div>
          <Typography variant="body2">Twitter</Typography>
        </Grid>
        <Grid item xs={8}>
          <div className={clsx(classes.item, classes.status, classes.contents)}>
            <FormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  checked={twitterIntegration !== undefined}
                  value="twitter"
                  onChange={() =>
                    onChangeSettingTwitterIntegration(!twitterIntegration)
                  }
                />
              }
              label=""
            />
            <Typography variant="body1">
              {twitterIntegration ? (
                <span>
                  現在<b>有効</b>です (
                  <Link
                    href={`https://twitter.com/${twitterIntegration.screenName}`}
                    color="secondary"
                    target="_brank"
                    rel="noopener"
                  >
                    @{twitterIntegration.screenName}
                  </Link>
                  )
                </span>
              ) : (
                '現在無効です'
              )}
            </Typography>
          </div>
          <div className={classes.item}>
            <Typography variant="body2">
              コメントの投稿と同時にTwitterに投稿できます。
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
