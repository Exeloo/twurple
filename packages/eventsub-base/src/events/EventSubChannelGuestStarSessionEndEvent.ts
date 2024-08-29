import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import type { EventSubChannelGuestStarSessionEndEventData } from './EventSubChannelGuestStarSessionEndEvent.external';

@rtfm<EventSubChannelGuestStarSessionEndEvent>(
	'eventsub-base',
	'EventSubChannelGuestStarSessionEndEvent',
	'broadcasterId',
)
export class EventSubChannelGuestStarSessionEndEvent extends DataObject<EventSubChannelGuestStarSessionEndEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubChannelGuestStarSessionEndEventData, client: ApiClient) {
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

	/**
	 * The ID of the host.
	 */
	get hostId(): string | null {
		return this[rawDataSymbol].host_user_id;
	}

	/**
	 * The name of the host.
	 */
	get hostName(): string | null {
		return this[rawDataSymbol].host_user_login;
	}

	/**
	 * The display name of the host.
	 */
	get hostDisplayName(): string | null {
		return this[rawDataSymbol].host_user_name;
	}

	/**
	 * Gets more information about the host.
	 */
	async getHost(): Promise<HelixUser | null> {
		if (!this[rawDataSymbol].host_user_id) {
			return null;
		}
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].host_user_id));
	}

	get sessionId(): string {
		return this[rawDataSymbol].session_id;
	}

	get startedAt(): Date {
		return new Date(this[rawDataSymbol].started_at);
	}

	get endedAt(): Date {
		return new Date(this[rawDataSymbol].ended_at);
	}
}
