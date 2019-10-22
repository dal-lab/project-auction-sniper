import SendBird from 'sendbird';

import pify from 'pify';

const PF = (context: Object, f: Function) =>
  pify(f.bind(context), { errorFirst: false });

export class ChatService {
  async connect(appId: string, userId: string) {
    const sb = new SendBird({ appId });
    await PF(sb, sb.connect)(userId);
  }

  async disconnect() {
    const sb = SendBird.getInstance();
    await PF(sb, sb.disconnect)();
  }

  async enter(channelUrl: string) {
    const sb = SendBird.getInstance();
    const oc = sb.OpenChannel;
    const channel = await PF(oc, oc.getChannel)(channelUrl);
    await PF(channel, channel.enter)();
  }

  addListener(handlerId: string, events: Record<string, Function>) {
    const sb = SendBird.getInstance();
    const handler = new sb.ChannelHandler();
    Object.entries(events).forEach(([name, f]) => {
      Reflect.set(handler, name, f);
    });
    sb.addChannelHandler(handlerId, handler);
  }
}

export default new ChatService();
