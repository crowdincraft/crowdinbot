import { Client } from 'discord.js';
import config from 'config';
import CrowdinBot from './CrowdinBot';

function getOrDefault<T>( configPath: string, defaultValue: T ): T {
	if ( !config.has( configPath ) ) CrowdinBot.logger.debug( `config ${ configPath } not set, assuming default` );
	return config.has( configPath ) ? config.get( configPath ) : defaultValue;
}

export default class BotConfig {
	public static debug: boolean;
	private static token: string;
	public static owners: string[];

	public static init(): void {
		this.debug = getOrDefault( 'debug', false );
		this.token = config.get( 'token' );
		this.owners = getOrDefault( 'owners', [] );
	}

	public static async login( client: Client ): Promise<boolean> {
		try {
			await client.login( this.token );
		} catch ( err ) {
			CrowdinBot.logger.error( err );
			return false;
		}
		return true;
	}
}
