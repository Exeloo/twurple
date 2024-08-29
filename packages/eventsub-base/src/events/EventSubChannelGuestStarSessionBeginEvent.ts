import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import type { EventSubChannelGuestStarSessionBeginEventData } from './EventSubChannelGuestStarSessionBeginEvent.external';

@rtfm<EventSubChannelGuestStarSessionBeginEvent>(
	'eventsub-base',
	'EventSubChannelGuestStarSessionBeginEvent',
	'broadcasterId',
)
export class EventSubChannelGuestStarSessionBeginEvent extends DataObject<EventSubChannelGuestStarSessionBeginEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubChannelGuestStarSessionBeginEventData, client: ApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * The broadcaster's user ID for the channel the ad was run on.
	 */
	get broadcasterId(): string {
		return this[rawDataSymbol].broadcaster_user_id;
	}

	/**
	 * The broadcaster's user login for the channel the ad was run on.
	 */
	get broadcasterName(): string {
		return this[rawDataSymbol].broadcaster_user_login;
	}

	/**
	 * The broadcaster's user display name for the channel the ad was run on.
	 */
	get broadcasterDisplayName(): string {
		return this[rawDataSymbol].broadcaster_user_name;
	}

	/**
	 * Gets more information about the broadcaster.
	 */
	async getBroadcaster(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
	}

	get sessionId(): string {
		return this[rawDataSymbol].session_id;
	}

	get startedAt(): Date {
		return new Date(this[rawDataSymbol].started_at);
	}
}
