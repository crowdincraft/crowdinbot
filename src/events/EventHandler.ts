import { ClientEvents } from 'discord.js';

export default interface EventHandler<K extends keyof ClientEvents> {
    eventName: K;
    onEvent: ( ...args: ClientEvents[K] ) => void | Promise<void>;
}
