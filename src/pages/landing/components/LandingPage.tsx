import { Box, Button } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../shared/components/Page';

export const LandingPage: React.FC<RouteComponentProps> = ({ history }) => {
  const buttons = ['signin', 'dashboard', 'events'];

  // const onClickReqestAuthToken = () => {
  //   oauthRequestToken({
  //     oauth_callback: 'http://localhost:3000/apicallback',
  //   })
  //     .then(result => {
  //       const data: FunctionsResponse = result.data;
  //       const body: string = data.body;
  //       const params: ParsedQuery<string> = queryString.parse(body);
  //       const { oauth_token, oauth_token_secret } = params;
  //     })
  //     .catch(error => console.error(error));
  // };

  // const onClickReqestAccessToken = () => {
  //   oauthAcccessToken({
  //     oauth_token: 'JOot0AAAAAAA9Ix7AAABbnlji2Q',
  //     oauth_verifier: 'qWJREhmGMMhBQPBHo7sWHTOraJTXrEm0',
  //   })
  //     .then(result => console.log(result.data))
  //     .catch(error => console.log(error));
  // };

  // const onClickTweet = () => {
  //   tweet({
  //     oauth_token: '989846338652160002-CfOK1NrhL7X5ASY47w04tUjEfVk6NTr',
  //     oauth_token_secret: 'cUbhy6i60PXRIkkgqsSGoTP8xBe4octFER9IsmzKy7BhY',
  //     status: 'hello first tweet xx',
  //   })
  //     .then(result => console.log(result))
  //     .catch(error => console.log(error));
  // };

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
      {/* <Box>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px', color: '#fff' }}
          onClick={onClickReqestAuthToken}
        >
          Request AuthToken
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px', color: '#fff' }}
          onClick={onClickReqestAccessToken}
        >
          Request AccessToken
        </Button>
      </Box> */}
      {/* <Box>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px', color: '#fff' }}
          onClick={onClickTweet}
        >
          Tweet
        </Button>
      </Box> */}
    </Page>
  );
};
