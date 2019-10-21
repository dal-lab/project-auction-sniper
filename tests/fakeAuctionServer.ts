import SendBird from 'sendbird';

const APP_ID = "";
const USER_ID = "sniper";

export default class FakeAuctionServer {
  constructor(itemId: string) {
  }

  async connect() {
    const sb = new SendBird({ appId: APP_ID });

    const user = await new Promise((resolve, reject) => {
      sb.connect(USER_ID, (user, error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(user);
      });
    })

    const openChannel = await new Promise<SendBird.OpenChannel>((resolve, reject) => {
      sb.OpenChannel.createChannel((openChannel, error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(openChannel);
      });
    })

    const response = await new Promise((resolve, reject) => {
      openChannel.enter((response, error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(response);
      });
    });

    const message = await new Promise((resolve, reject) => {
      openChannel.sendUserMessage(
        "Hello", "", "", (message, error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(message);
        });
    });

    console.log(message);
  }

  async startSellingItem() {
    // TODO
    await this.connect();
  }

  hasReceivedJoinRequestFromSniper() {
    // TODO
  }

  announceClosed() {
    // TODO
  }
}
