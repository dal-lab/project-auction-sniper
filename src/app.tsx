import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useEffect } from 'react';

import { ChatService } from './utils/chatService';

const KEY = process.env.PUSHER_KEY || '';
const CLUSTER = process.env.PUSHER_CLUSTER || '';
const AUTH_ENDPOINT = process.env.PUSHER_AUTH_ENDPOINT || '';
const CHANNEL_ID = process.env.PUSHER_CHANNEL_ID || '';

const connect = (): void => {
  const chatService = new ChatService(KEY, CLUSTER, AUTH_ENDPOINT);
  chatService.enter(CHANNEL_ID);
}

const App = (): JSX.Element => {
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
