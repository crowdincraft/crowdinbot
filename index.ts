import * as log4js from 'log4js';
import BotConfig from './src/BotConfig';
import CrowdinBot from './src/CrowdinBot';

log4js.configure( {
	appenders: {
		console: { type: 'console' },
	},
	categories: {
		default: { appenders: ['console'], level: 'info' },
	},
} );

try {
	BotConfig.init();

	const logConfig: log4js.Configuration = {
		appenders: {
			out: { type: 'stdout' },
		},
		categories: {
			default: { appenders: [ 'out' ], level: BotConfig.debug ? 'debug' : 'info' },
		},
	};

	log4js.configure( logConfig );

	if ( BotConfig.debug ) {
		CrowdinBot.logger.info( 'Debug mode is activated' );
	}

	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	CrowdinBot.start();
} catch ( err ) {
	CrowdinBot.logger.error( err );
}
