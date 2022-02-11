import { Client, Intents } from 'discord.js';
import * as log4js from 'log4js';
import BotConfig from './BotConfig';
import EventRegistry from "./events/EventRegistry";
import ErrorEventHandler from "./events/discord/ErrorEventHandler";
import MessageEventHandler from "./events/message/MessageEventHandler";

export default class CrowdinBot {
	public static logger = log4js.getLogger( 'CrowdinBot' );

	public static client: Client = new Client( {
		partials: ['MESSAGE', 'REACTION', 'USER'],
		ws: {
			intents: Intents.NON_PRIVILEGED,
		},
	} );
	private static running = false;

	public static async start(): Promise<void> {
		if ( this.running ) {
			this.logger.error( 'CrowdinBot is still running. You can only start a bot that is not currently running.' );
			return;
		}

		// Ensure graceful shutdown
		process.on( 'SIGTERM', async () => {
			this.logger.info( 'The bot process has been terminated (SIGTERM).' );

			await CrowdinBot.shutdown();
		} );

		process.on( 'SIGINT', async () => {
			this.logger.info( 'The bot process has been terminated (SIGINT).' );

			await CrowdinBot.shutdown();
		} );

		try {
			const loginResult = await BotConfig.login( this.client );
			if ( !loginResult ) return;

			this.running = true;
			if ( this.client.user == null ) {
				throw Error( 'Null user!' );
			}
			this.logger.info( `CrowdinBot has been started successfully. Logged in as ${ this.client.user.tag }` );

			// Register events.
			EventRegistry.setClient( this.client );
			EventRegistry.add( new ErrorEventHandler() );
			EventRegistry.add( new MessageEventHandler( this.client.user.id ) );

			try {
				await this.client.user.setActivity( '!crowdin help' );
			} catch ( error ) {
				CrowdinBot.logger.error( error );
			}

		} catch ( err ) {
			this.logger.error( `CrowdinBot could not be started: ${ err }` );
			await this.shutdown();
		}
	}

	public static async shutdown(): Promise<void> {
		if ( !this.running ) {
			this.logger.error( 'CrowdinBot is not running yet. You can only shut down a running bot.' );
			return;
		}

		this.logger.info( 'Initiating graceful shutdown...' );

		try {
			this.client.destroy();
			this.running = false;
			this.logger.info( 'CrowdinBot has been successfully shut down.' );

			log4js.shutdown( ( err ) => {
				if ( err ) {
					console.log( err );
				}
				process.exit();
			} );
		} catch ( err ) {
			this.logger.error( `CrowdinBot could not be shut down: ${ err }` );
		}
	}
}
