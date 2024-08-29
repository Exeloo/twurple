import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelGuestStarSessionEndEvent } from '../events/EventSubChannelGuestStarSessionEndEvent';
import type { EventSubChannelGuestStarSessionEndEventData } from '../events/EventSubChannelGuestStarSessionEndEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelGuestStarSessionEndSubscription extends EventSubSubscription<EventSubChannelGuestStarSessionEndEvent> {
	/** @protected */ readonly _cliName = 'channel.guest_star_session.end';

	constructor(
		handler: (data: EventSubChannelGuestStarSessionEndEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.guest_star_session.end.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(
		data: EventSubChannelGuestStarSessionEndEventData,
	): EventSubChannelGuestStarSessionEndEvent {
		return new EventSubChannelGuestStarSessionEndEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelGuestStarSessionEndEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
