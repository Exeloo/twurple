import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubAutomodMessageHoldEvent } from '../events/EventSubAutomodMessageHoldEvent';
import type { EventSubAutomodMessageHoldEventData } from '../events/EventSubAutomodMessageHoldEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubAutomodMessageHoldSubscription extends EventSubSubscription<EventSubAutomodMessageHoldEvent> {
	/** @protected */ readonly _cliName = 'automod.message.hold';

	constructor(
		handler: (data: EventSubAutomodMessageHoldEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `automod.message.hold.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubAutomodMessageHoldEventData): EventSubAutomodMessageHoldEvent {
		return new EventSubAutomodMessageHoldEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToAutomodMessageHoldEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
