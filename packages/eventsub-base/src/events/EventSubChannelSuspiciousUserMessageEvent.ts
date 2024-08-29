import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import type {
	EventSubChannelSuspiciousUserMessageBanEvasionEvaluation,
	EventSubChannelSuspiciousUserMessageEventData,
	EventSubChannelSuspiciousUserMessageLowTrustStatus,
	EventSubChannelSuspiciousUserMessageType,
	IEventSubChannelSuspiciousUserMessageMessage,
} from './EventSubChannelSuspiciousUserMessageEvent.external';

@rtfm<EventSubChannelSuspiciousUserMessageEvent>(
	'eventsub-base',
	'EventSubChannelSuspiciousUserMessageEvent',
	'broadcasterId',
)
export class EventSubChannelSuspiciousUserMessageEvent extends DataObject<EventSubChannelSuspiciousUserMessageEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubChannelSuspiciousUserMessageEventData, client: ApiClient) {
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

	get lowTrustStatus(): EventSubChannelSuspiciousUserMessageLowTrustStatus {
		return this[rawDataSymbol].low_trust_status;
	}

	get sharedBanChannelIds(): string[] {
		return this[rawDataSymbol].shared_ban_channel_ids;
	}

	get types(): EventSubChannelSuspiciousUserMessageType[] {
		return this[rawDataSymbol].types;
	}

	get banEvasionEvaluation(): EventSubChannelSuspiciousUserMessageBanEvasionEvaluation {
		return this[rawDataSymbol].ban_evasion_evaluation;
	}

	get message(): IEventSubChannelSuspiciousUserMessageMessage {
		return this[rawDataSymbol].message;
	}
}
