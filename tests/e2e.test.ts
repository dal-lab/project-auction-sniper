import * as CodeceptJS from 'codeceptjs';

import FakeAuctionServer from "./fakeAuctionServer";
import ApplicationRunner from "./applicationRunner";

Feature('Auction Sniper E2E Test');

Scenario('sniper joins auction until closes', (I?: CodeceptJS.I) => {
  const auction = new FakeAuctionServer('item-54321');
  const application = new ApplicationRunner(I);

  auction.startSellingItem();
  application.startBiddingIn(auction);
  auction.hasReceivedJoinRequestFromSniper();
  auction.announceClosed();
  application.showsSniperHasLostAuction();
});
