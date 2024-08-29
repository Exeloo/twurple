import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import type {
	EventSubChannelAutomaticRedemptionAddEventData,
	IEventSubChannelAutomaticRedemptionAddMessage,
	IEventSubChannelAutomaticRedemptionAddReward,
} from './EventSubChannelAutomaticRedemptionAddEvent.external';

@rtfm<EventSubChannelAutomaticRedemptionAddEvent>(
	'eventsub-base',
	'EventSubChannelAutomaticRedemptionAddEvent',
	'broadcasterId',
)
export class EventSubChannelAutomaticRedemptionAddEvent extends DataObject<EventSubChannelAutomaticRedemptionAddEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubChannelAutomaticRedemptionAddEventData, client: ApiClient) {
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

	get id(): string {
		return this[rawDataSymbol].id;
	}

	get reward(): IEventSubChannelAutomaticRedemptionAddReward {
		return this[rawDataSymbol].reward;
	}

	get message(): IEventSubChannelAutomaticRedemptionAddMessage {
		return this[rawDataSymbol].message;
	}

	get userInput(): string {
		return this[rawDataSymbol].user_input;
	}

	get redeemedAt(): Date {
		return new Date(this[rawDataSymbol].redeemed_at);
	}
}
