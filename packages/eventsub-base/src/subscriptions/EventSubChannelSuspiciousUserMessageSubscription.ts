import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelSuspiciousUserMessageEvent } from '../events/EventSubChannelSuspiciousUserMessageEvent';
import type { EventSubChannelSuspiciousUserMessageEventData } from '../events/EventSubChannelSuspiciousUserMessageEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelSuspiciousUserMessageSubscription extends EventSubSubscription<EventSubChannelSuspiciousUserMessageEvent> {
	/** @protected */ readonly _cliName = 'channel.suspicious_user.message';

	constructor(
		handler: (data: EventSubChannelSuspiciousUserMessageEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.suspicious_user.message.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(
		data: EventSubChannelSuspiciousUserMessageEventData,
	): EventSubChannelSuspiciousUserMessageEvent {
		return new EventSubChannelSuspiciousUserMessageEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelSuspiciousUserMessageEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
