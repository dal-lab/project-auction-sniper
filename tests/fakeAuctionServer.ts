import { ChatService } from '../src/utils/chatService';

import assert from 'assert';
import waitForExpect from 'wait-for-expect';

const KEY = process.env.PUSHER_KEY || '';
const CLUSTER = process.env.PUSHER_CLUSTER || '';
const AUTH_ENDPOINT = process.env.PUSHER_AUTH_ENDPOINT || '';
const CHANNEL_ID = process.env.PUSHER_CHANNEL_ID || '';

export default class FakeAuctionServer {
  chatService?: ChatService;
  entered = false;

  constructor(itemId: string) {
  }

  connect() {
    this.chatService = new ChatService(KEY, CLUSTER, AUTH_ENDPOINT);
    this.chatService.enter(CHANNEL_ID);
    this.chatService.addListener({
      'user-entered': () => {
        this.entered = true;
      },
    });
  }

  async startSellingItem() {
    this.connect();
  }

  async hasReceivedJoinRequestFromSniper() {
    await waitForExpect(() => {
      assert.equal(this.entered, true);
    });
  }

  async announceClosed() {
    this.chatService!.disconnect();
  }
}
