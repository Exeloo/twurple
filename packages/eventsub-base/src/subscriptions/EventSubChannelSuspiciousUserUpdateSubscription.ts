import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelSuspiciousUserUpdateEvent } from '../events/EventSubChannelSuspiciousUserUpdateEvent';
import type { EventSubChannelSuspiciousUserUpdateEventData } from '../events/EventSubChannelSuspiciousUserUpdateEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelSuspiciousUserUpdateSubscription extends EventSubSubscription<EventSubChannelSuspiciousUserUpdateEvent> {
	/** @protected */ readonly _cliName = 'channel.suspicious_user.update';

	constructor(
		handler: (data: EventSubChannelSuspiciousUserUpdateEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.suspicious_user.update.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(
		data: EventSubChannelSuspiciousUserUpdateEventData,
	): EventSubChannelSuspiciousUserUpdateEvent {
		return new EventSubChannelSuspiciousUserUpdateEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelSuspiciousUserUpdateEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
