import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelGuestStarSessionBeginEvent } from '../events/EventSubChannelGuestStarSessionBeginEvent';
import type { EventSubChannelGuestStarSessionBeginEventData } from '../events/EventSubChannelGuestStarSessionBeginEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelGuestStarSessionBeginSubscription extends EventSubSubscription<EventSubChannelGuestStarSessionBeginEvent> {
	/** @protected */ readonly _cliName = 'channel.guest_star_session.begin';

	constructor(
		handler: (data: EventSubChannelGuestStarSessionBeginEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.guest_star_session.begin.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(
		data: EventSubChannelGuestStarSessionBeginEventData,
	): EventSubChannelGuestStarSessionBeginEvent {
		return new EventSubChannelGuestStarSessionBeginEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelGuestStarSessionBeginEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
