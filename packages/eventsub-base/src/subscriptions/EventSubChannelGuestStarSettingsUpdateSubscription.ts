import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelGuestStarSettingsUpdateEvent } from '../events/EventSubChannelGuestStarSettingsUpdateEvent';
import type { EventSubChannelGuestStarSettingsUpdateEventData } from '../events/EventSubChannelGuestStarSettingsUpdateEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelGuestStarSettingsUpdateSubscription extends EventSubSubscription<EventSubChannelGuestStarSettingsUpdateEvent> {
	/** @protected */ readonly _cliName = 'channel.guest_star_settings.update';

	constructor(
		handler: (data: EventSubChannelGuestStarSettingsUpdateEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.guest_star_settings.update.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(
		data: EventSubChannelGuestStarSettingsUpdateEventData,
	): EventSubChannelGuestStarSettingsUpdateEvent {
		return new EventSubChannelGuestStarSettingsUpdateEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelGuestStarSettingsUpdateEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
