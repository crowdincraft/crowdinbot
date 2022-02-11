import CrowdinBot from '../CrowdinBot';
import { TextChannel, Message, Channel, Guild, GuildMember, User } from 'discord.js';

export default class DiscordUtil {
    public static async getChannel( channelId: string ): Promise<Channel> {
        return await CrowdinBot.client.channels.fetch( channelId );
    }

    public static async getMessage( channel: TextChannel, messageId: string ): Promise<Message> {
        return await channel.messages.fetch( messageId );
    }

    public static async getMember( guild: Guild, userId: string ): Promise<GuildMember> {
        return await guild.members.fetch( userId );
    }

    public static async fetchMessage( message: Message ): Promise<Message> {
        if ( !message.deleted && message.partial ) {
            message = await message.fetch();
        }
        return message;
    }

    public static async fetchUser( user: User ): Promise<User> {
        if ( user.partial ) {
            user = await user.fetch();
        }
        return user;
    }
}
