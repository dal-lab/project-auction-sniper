import * as CodeceptJS from 'codeceptjs';
import FakeAuctionServer from './fakeAuctionServer';

export default class ApplicationRunner {
  I: CodeceptJS.I;

  constructor(I: CodeceptJS.I) {
    this.I = I;

    this.I.amOnPage('http://localhost:8080/');
  }

  startBiddingIn(auction: FakeAuctionServer) {
    this.I.see('Joining')
  }

  showsSniperHasLostAuction() {
    this.I.see('Lost')
  }
}
