import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useEffect } from 'react';

import chatService from './utils/chatService';

const APP_ID = process.env.SENDBIRD_APP_ID || '';
const USER_ID = 'sniper';
const CHANNEL_URL = process.env.SENDBIRD_CHANNEL_URL || '';

const connect = async () => {
  await chatService.connect(APP_ID, USER_ID);
  await chatService.enter(CHANNEL_URL);
}

const App = () => {
  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <div>Joining</div>
      <div>Lost</div>
    </>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
