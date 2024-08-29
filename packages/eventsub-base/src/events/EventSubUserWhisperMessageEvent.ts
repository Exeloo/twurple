import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import type { EventSubUserWhisperMessageEventData } from './EventSubUserWhisperMessageEvent.external';
import type { EventSubChatMessagePart } from './common/EventSubChatMessage.external';

@rtfm<EventSubUserWhisperMessageEvent>('eventsub-base', 'EventSubUserWhisperMessageEvent', 'fromUserId')
export class EventSubUserWhisperMessageEvent extends DataObject<EventSubUserWhisperMessageEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubUserWhisperMessageEventData, client: ApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * The ID of the sender.
	 */
	get fromUserId(): string {
		return this[rawDataSymbol].from_user_id;
	}

	/**
	 * The name of the sender.
	 */
	get fromUserName(): string {
		return this[rawDataSymbol].from_user_login;
	}

	/**
	 * The display name of the sender.
	 */
	get fromUserDisplayName(): string {
		return this[rawDataSymbol].from_user_name;
	}

	/**
	 * Gets more information about the sender.
	 */
	async getFromUser(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].from_user_id));
	}

	/**
	 * The ID of the receiver.
	 */
	get toUserId(): string {
		return this[rawDataSymbol].to_user_id;
	}

	/**
	 * The name of the receiver.
	 */
	get toUserName(): string {
		return this[rawDataSymbol].to_user_login;
	}

	/**
	 * The display name of the receiver.
	 */
	get toUserDisplayName(): string {
		return this[rawDataSymbol].to_user_name;
	}

	/**
	 * Gets more information about the receiver.
	 */
	async getToUser(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].to_user_id));
	}

	/**
	 * The ID of the whisper.
	 */
	get whisperId(): string {
		return this[rawDataSymbol].whisper_id;
	}

	/**
	 * The text that was sent, e.g. the resub whisper or announcement text.
	 */
	get whisperText(): string {
		return this[rawDataSymbol].whisper.text;
	}

	/**
	 * The text that was sent, structured into pre-parsed parts.
	 */
	get whisperParts(): EventSubChatMessagePart[] {
		return this[rawDataSymbol].whisper.fragments;
	}
}
