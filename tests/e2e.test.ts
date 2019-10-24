require('dotenv').config();

import * as CodeceptJS from 'codeceptjs';

import FakeAuctionServer from './fakeAuctionServer';
import ApplicationRunner from './applicationRunner';

Feature('Auction Sniper E2E Test');

Scenario('sniper joins auction until closes', async (I: any) => {
  const auction = new FakeAuctionServer('item-54321');
  const application = new ApplicationRunner(I as CodeceptJS.I);

  await auction.startSellingItem();
  application.startBiddingIn(auction);
  await auction.hasReceivedJoinRequestFromSniper();
  await auction.announceClosed();
  application.showsSniperHasLostAuction();
});
