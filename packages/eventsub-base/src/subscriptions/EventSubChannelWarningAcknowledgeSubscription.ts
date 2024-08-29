import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelWarningAcknowledgeEvent } from '../events/EventSubChannelWarningAcknowledgeEvent';
import type { EventSubChannelWarningAcknowledgeEventData } from '../events/EventSubChannelWarningAcknowledgeEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelWarningAcknowledgeSubscription extends EventSubSubscription<EventSubChannelWarningAcknowledgeEvent> {
	/** @protected */ readonly _cliName = 'channel.warning.acknowledge';

	constructor(
		handler: (data: EventSubChannelWarningAcknowledgeEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.warning.acknowledge.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubChannelWarningAcknowledgeEventData): EventSubChannelWarningAcknowledgeEvent {
		return new EventSubChannelWarningAcknowledgeEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToChannelWarningAcknowledgeEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
