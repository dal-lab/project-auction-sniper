import Pusher from 'pusher-js';

// Pusher.logToConsole = true;

export class ChatService {
  pusher?: Pusher.Pusher;
  channel?: Pusher.Channel;

  constructor(key: string, cluster: string, authEndpoint: string) {
    this.pusher = new Pusher(key, {
      cluster,
      authEndpoint,
    });
  }

  disconnect(): void {
    this.pusher!.disconnect();
  }

  enter(channelId: string): void {
    this.channel = this.pusher!.subscribe(`presence-${channelId}`);
  }

  addListener(events: Record<string, Function>): void {
    const EVENTS_MAP: Record<string, string> = {
      'ready': 'pusher:subscription_succeeded',
      'user-entered': 'pusher:member_added',
    };

    Object.entries(events).forEach(([name, f]) => {
      const eventName = EVENTS_MAP[name] || `client-${name}`;
      this.channel!.bind(eventName, (data: any) => f(data));
    });
  }

  send(event: string, data: any = {}): void {
    this.channel!.trigger(`client-${event}`, data);
  }
}
