import SendBird from 'sendbird';

import pify from 'pify';

type FunctionType = (...args: any[]) => void;

function PF(context: Record<string, any>, f: FunctionType) {
  return pify(f.bind(context), { errorFirst: false });
}

export class ChatService {
  async connect(appId: string, userId: string): Promise<void> {
    const sb = new SendBird({ appId });
    await PF(sb, sb.connect)(userId);
  }

  async disconnect(): Promise<void> {
    const sb = SendBird.getInstance();
    await PF(sb, sb.disconnect)();
  }

  async enter(channelUrl: string): Promise<void> {
    const sb = SendBird.getInstance();
    const oc = sb.OpenChannel;
    const channel = await PF(oc, oc.getChannel)(channelUrl);
    await PF(channel, channel.enter)();
  }

  async leave(channelUrl: string): Promise<void> {
    const sb = SendBird.getInstance();
    const oc = sb.OpenChannel;
    const channel = await PF(oc, oc.getChannel)(channelUrl);
    await PF(channel, channel.exit)();
  }

  addListener(handlerId: string, events: Record<string, FunctionType>): void {
    const sb = SendBird.getInstance();
    const handler = new sb.ChannelHandler();
    Object.entries(events).forEach(([name, f]) => {
      Reflect.set(handler, name, f);
    });
    sb.addChannelHandler(handlerId, handler);
  }
}

export default new ChatService();
