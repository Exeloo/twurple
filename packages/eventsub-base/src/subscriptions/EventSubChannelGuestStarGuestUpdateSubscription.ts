import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelGuestStarGuestUpdateEvent } from '../events/EventSubChannelGuestStarGuestUpdateEvent';
import type { EventSubChannelGuestStarGuestUpdateEventData } from '../events/EventSubChannelGuestStarGuestUpdateEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelGuestStarGuestUpdateSubscription extends EventSubSubscription<EventSubChannelGuestStarGuestUpdateEvent> {
	/** @protected */ readonly _cliName = 'channel.guest_star_guest.update';

	constructor(
		handler: (data: EventSubChannelGuestStarGuestUpdateEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.guest_star_guest.update.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(
		data: EventSubChannelGuestStarGuestUpdateEventData,
	): EventSubChannelGuestStarGuestUpdateEvent {
		return new EventSubChannelGuestStarGuestUpdateEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelGuestStarGuestUpdateEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
