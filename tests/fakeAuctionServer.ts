import chatService from '../src/utils/chatService';

import assert from 'assert';
import waitForExpect from 'wait-for-expect';

const APP_ID = process.env.SENDBIRD_APP_ID || '';
const USER_ID = 'auction';
const CHANNEL_URL = process.env.SENDBIRD_CHANNEL_URL || '';
const CHANNEL_HANDLER_ID = 'test';

export default class FakeAuctionServer {
  entered = false;

  constructor(itemId: string) {
  }

  async connect() {
    await chatService.connect(APP_ID, USER_ID);
    await chatService.enter(CHANNEL_URL);
    chatService.addListener(CHANNEL_HANDLER_ID, {
      onUserEntered: () => {
        this.entered = true;
      }
    });
  }

  async startSellingItem() {
    await this.connect();
  }

  async hasReceivedJoinRequestFromSniper() {
    await waitForExpect(() => {
      assert.equal(this.entered, true);
    });
  }

  async announceClosed() {
    await chatService.leave(CHANNEL_URL);
    await chatService.disconnect();
  }
}
