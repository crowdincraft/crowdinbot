import PingCommand from './PingCommand';
import ShutdownCommand from './ShutdownCommand';

export default class CommandRegistry {
    public static PING_COMMAND = new PingCommand();
    public static SHUTDOWN_COMMAND = new ShutdownCommand();
}