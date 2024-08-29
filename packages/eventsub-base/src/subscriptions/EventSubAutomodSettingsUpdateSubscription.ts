import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubAutomodSettingsUpdateEvent } from '../events/EventSubAutomodSettingsUpdateEvent';
import type { EventSubAutomodSettingsUpdateEventData } from '../events/EventSubAutomodSettingsUpdateEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubAutomodSettingsUpdateSubscription extends EventSubSubscription<EventSubAutomodSettingsUpdateEvent> {
	/** @protected */ readonly _cliName = 'automod.settings.update';

	constructor(
		handler: (data: EventSubAutomodSettingsUpdateEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `automod.settings.update.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubAutomodSettingsUpdateEventData): EventSubAutomodSettingsUpdateEvent {
		return new EventSubAutomodSettingsUpdateEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToAutomodSettingsUpdateEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
