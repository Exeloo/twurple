import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';

import type { EventSubBase } from '../EventSubBase';
import { EventSubAutomodTermsUpdateEvent } from '../events/EventSubAutomodTermsUpdateEvent';
import type { EventSubAutomodTermsUpdateEventData } from '../events/EventSubAutomodTermsUpdateEvent.external';
import { EventSubSubscription } from './EventSubSubscription';

/** @internal */
@rtfm('eventsub-base', 'EventSubSubscription')
export class EventSubAutomodTermsUpdateSubscription extends EventSubSubscription<EventSubAutomodTermsUpdateEvent> {
	/** @protected */ readonly _cliName = 'automod.terms.update';

	constructor(
		handler: (data: EventSubAutomodTermsUpdateEvent) => void,
		client: EventSubBase,
		private readonly _broadcasterId: string,
		private readonly _userId: string,
	) {
		super(handler, client);
	}

	get id(): string {
		return `automod.terms.update.${this._broadcasterId}.${this._userId}`;
	}

	get authUserId(): string | null {
		return this._userId;
	}

	protected transformData(data: EventSubAutomodTermsUpdateEventData): EventSubAutomodTermsUpdateEvent {
		return new EventSubAutomodTermsUpdateEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.asUser(
			this._userId,
			async ctx =>
				await ctx.eventSub.subscribeToAutomodTermsUpdateEvents(
					this._broadcasterId,
					await this._getTransportOptions(),
				),
		);
	}
}
