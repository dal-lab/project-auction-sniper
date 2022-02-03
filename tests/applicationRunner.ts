jest.setTimeout(10 * 1000);

import waitForExpect from 'wait-for-expect';

waitForExpect.defaults.timeout = 10 * 1000;

import { Page } from 'puppeteer';

import FakeAuctionServer from './fakeAuctionServer';

export default class ApplicationRunner {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async startBiddingIn(auction: FakeAuctionServer) {
    await this.page.goto('http://localhost:8080/');
    await waitForExpect(async () => {
      const html = await this.page.content();
      expect(html).toContain('Joining');
    });
  }

  async showsSniperHasLostAuction() {
    await waitForExpect(async () => {
      const html = await this.page.content();
      expect(html).toContain('Lost');
    });
  }
}
