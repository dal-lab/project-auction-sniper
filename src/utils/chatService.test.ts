require('dotenv').config();

import { ChatService } from './chatService';

import waitForExpect from 'wait-for-expect';

const KEY = process.env.PUSHER_KEY || '';
const CLUSTER = process.env.PUSHER_CLUSTER || '';
const AUTH_ENDPOINT = process.env.PUSHER_AUTH_ENDPOINT || '';
const CHANNEL_ID = process.env.PUSHER_CHANNEL_ID || '';

test('simple', async () => {
  let ready = false;
  let entered = false;

  const chat1 = new ChatService(KEY, CLUSTER, AUTH_ENDPOINT);
  chat1.enter(CHANNEL_ID);
  chat1.addListener({
    'ready': () => {
      ready = true;
    },
    'user-entered': () => {
      entered = true;
    },
  });

  await waitForExpect(() => {
    expect(ready).toBeTruthy();
  });

  const chat2 = new ChatService(KEY, CLUSTER, AUTH_ENDPOINT);
  chat2.enter(CHANNEL_ID);

  await waitForExpect(() => {
    expect(entered).toBeTruthy();
  });

  chat1.disconnect();
  chat2.disconnect();
});
