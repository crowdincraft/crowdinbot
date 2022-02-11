import { Message } from 'discord.js';
import CrowdinBot from '../CrowdinBot';
import PrefixCommand from './PrefixCommand';
import PermissionRegistry from '../permissions/PermissionRegistry';
import Command from './Command';

export default class ShutdownCommand extends PrefixCommand {
	public readonly permissionLevel = PermissionRegistry.OWNER_PERMISSION;

	public readonly aliases = ['shutdown', 'stop'];

	public async run( message: Message, args: string ): Promise<boolean> {
		if ( args.length ) {
			return false;
		}

		if ( message.deletable ) {
			try {
				await message.delete();
			} catch ( err ) {
				Command.logger.error( err );
			}
		}

		try {
			await CrowdinBot.shutdown();
		} catch {
			return false;
		}

		return true;
	}

	public asString(): string {
		return '!crowdin shutdown';
	}
}
