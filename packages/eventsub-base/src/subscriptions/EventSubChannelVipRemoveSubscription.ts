import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelVipRemoveEvent } from '../events/EventSubChannelVipRemoveEvent';
import type { EventSubChannelVipRemoveEventData } from '../events/EventSubChannelVipRemoveEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelVipRemoveSubscription extends EventSubSubscription<EventSubChannelVipRemoveEvent> {
	/** @protected */ readonly _cliName = 'channel.vip.remove';

	constructor(
		handler: (data: EventSubChannelVipRemoveEvent) => void,
		client: EventSubBase,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.vip.remove.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubChannelVipRemoveEventData): EventSubChannelVipRemoveEvent {
		return new EventSubChannelVipRemoveEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.eventSub.subscribeToChannelVipRemoveEvents(
			this._userId,
			await this._getTransportOptions(),
		);
	}
}
