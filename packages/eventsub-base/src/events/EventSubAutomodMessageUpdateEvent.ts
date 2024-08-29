import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import {
	type EventSubAutomodMessageUpdateEventData,
	type EventSubAutomodMessageUpdateStatus,
} from './EventSubAutomodMessageUpdateEvent.external';
import type { EventSubChatMessagePart } from './common/EventSubChatMessage.external';

@rtfm<EventSubAutomodMessageUpdateEvent>('eventsub-base', 'EventSubAutomodMessageUpdateEvent', 'broadcasterId')
export class EventSubAutomodMessageUpdateEvent extends DataObject<EventSubAutomodMessageUpdateEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubAutomodMessageUpdateEventData, client: ApiClient) {
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
	 * The ID of the concerned user.
	 */
	get userId(): string {
		return this[rawDataSymbol].user_id;
	}

	/**
	 * The name of the concerned user.
	 */
	get userName(): string {
		return this[rawDataSymbol].user_login;
	}

	/**
	 * The display name of the concerned user.
	 */
	get userDisplayName(): string {
		return this[rawDataSymbol].user_name;
	}

	/**
	 * Gets more information about the concerned user.
	 */
	async getUser(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
	}

	/**
	 * The ID of the message.
	 */
	get messageId(): string {
		return this[rawDataSymbol].message_id;
	}

	/**
	 * The text that was sent, e.g. the resub message or announcement text.
	 */
	get messageText(): string {
		return this[rawDataSymbol].message.text;
	}

	/**
	 * The text that was sent, structured into pre-parsed parts.
	 */
	get messageParts(): EventSubChatMessagePart[] {
		return this[rawDataSymbol].message.fragments;
	}

	get category(): string {
		return this[rawDataSymbol].category;
	}

	get level(): number {
		return this[rawDataSymbol].level;
	}

	get status(): EventSubAutomodMessageUpdateStatus {
		return this[rawDataSymbol].status;
	}

	get heldAt(): Date {
		return new Date(this[rawDataSymbol].held_at);
	}
}
