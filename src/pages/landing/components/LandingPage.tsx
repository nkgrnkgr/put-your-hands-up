import { Box, Button } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../shared/components/Page';

export const LandingPage: React.FC<RouteComponentProps> = ({ history }) => {
  const buttons = ['signin', 'dashboard', 'events'];

  return (
    <Page>
      {buttons.map(button => {
        return (
          <Box key={button}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '10px' }}
              onClick={() => history.push(`/${button}`)}
            >
              {button}
            </Button>
          </Box>
        );
      })}
    </Page>
  );
};
