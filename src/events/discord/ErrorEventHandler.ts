import CrowdinBot from '../../CrowdinBot';
import EventHandler from '../EventHandler';

export default class ErrorEventHandler implements EventHandler<'error'> {
	public readonly eventName = 'error';

	public onEvent = ( errorEvent: Error ): void => {
		CrowdinBot.logger.error( `An unexpected connection error occurred: ${ errorEvent.message }` );
	};
}
