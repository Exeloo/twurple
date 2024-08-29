import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelVipAddEvent } from '../events/EventSubChannelVipAddEvent';
import type { EventSubChannelVipAddEventData } from '../events/EventSubChannelVipAddEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelVipAddSubscription extends EventSubSubscription<EventSubChannelVipAddEvent> {
	/** @protected */ readonly _cliName = 'channel.vip.add';

	constructor(
		handler: (data: EventSubChannelVipAddEvent) => void,
		client: EventSubBase,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.vip.add.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubChannelVipAddEventData): EventSubChannelVipAddEvent {
		return new EventSubChannelVipAddEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.eventSub.subscribeToChannelVipRemoveEvents(
			this._userId,
			await this._getTransportOptions(),
		);
	}
}
