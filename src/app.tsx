import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useState, useEffect } from 'react';

import chatService from './utils/chatService';

const APP_ID = process.env.SENDBIRD_APP_ID || '';
const USER_ID = 'sniper';
const CHANNEL_URL = process.env.SENDBIRD_CHANNEL_URL || '';
const HANDLER_ID = 'auction';

const connect = async ({ setStatus }: {
  setStatus: (status: string) => void
}): Promise<void> => {
  await chatService.connect(APP_ID, USER_ID);
  await chatService.enter(CHANNEL_URL);
  chatService.addListener(HANDLER_ID, {
    onUserExited() {
      setStatus('Lost');
    },
  });
  setStatus('Joining');
};

const App = (): JSX.Element => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    connect({ setStatus });
  }, []);

  return (
    <>
      <div>{status}</div>
    </>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
