require('dotenv').config();

import puppeteer, { Browser, Page } from 'puppeteer';

import FakeAuctionServer from './fakeAuctionServer';
import ApplicationRunner from './applicationRunner';

let browser: Browser;
let page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
});

test('sniper joins auction until closes', async () => {
  const auction = new FakeAuctionServer('item-54321');
  const application = new ApplicationRunner(page);

  await auction.startSellingItem();
  await application.startBiddingIn(auction);
  await auction.hasReceivedJoinRequestFromSniper();
  await auction.announceClosed();
  await application.showsSniperHasLostAuction();
});
