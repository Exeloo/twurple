import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelWarningSendEvent } from '../events/EventSubChannelWarningSendEvent';
import type { EventSubChannelWarningSendEventData } from '../events/EventSubChannelWarningSendEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelWarningSendSubscription extends EventSubSubscription<EventSubChannelWarningSendEvent> {
	/** @protected */ readonly _cliName = 'channel.warning.send';

	constructor(
		handler: (data: EventSubChannelWarningSendEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.warning.send.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubChannelWarningSendEventData): EventSubChannelWarningSendEvent {
		return new EventSubChannelWarningSendEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelWarningSendEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
