import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubAutomodMessageUpdateEvent } from '../events/EventSubAutomodMessageUpdateEvent';
import type { EventSubAutomodMessageUpdateEventData } from '../events/EventSubAutomodMessageUpdateEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubAutomodMessageUpdateSubscription extends EventSubSubscription<EventSubAutomodMessageUpdateEvent> {
	/** @protected */ readonly _cliName = 'automod.message.update';

	constructor(
		handler: (data: EventSubAutomodMessageUpdateEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `automod.message.update.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubAutomodMessageUpdateEventData): EventSubAutomodMessageUpdateEvent {
		return new EventSubAutomodMessageUpdateEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToAutomodMessageUpdateEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
