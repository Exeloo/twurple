import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubChannelAutomaticRedemptionAddEvent } from '../events/EventSubChannelAutomaticRedemptionAddEvent';
import type { EventSubChannelAutomaticRedemptionAddEventData } from '../events/EventSubChannelAutomaticRedemptionAddEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubChannelAutomaticRedemptionAddSubscription extends EventSubSubscription<EventSubChannelAutomaticRedemptionAddEvent> {
	/** @protected */ readonly _cliName = 'channel.channel_points_automatic_reward_redemption.add';

	constructor(
		handler: (data: EventSubChannelAutomaticRedemptionAddEvent) => void,
		client: EventSubBase,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.channel_points_automatic_reward_redemption.add.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(
		data: EventSubChannelAutomaticRedemptionAddEventData,
	): EventSubChannelAutomaticRedemptionAddEvent {
		return new EventSubChannelAutomaticRedemptionAddEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.eventSub.subscribeToChannelAutomaticRedemptionAddEvents(
			this._userId,
			await this._getTransportOptions(),
		);
	}
}
