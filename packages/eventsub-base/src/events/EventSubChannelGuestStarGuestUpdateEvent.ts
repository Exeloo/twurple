import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import {
	type EventSubChannelGuestStarGuestUpdateEventData,
	type EventSubChannelGuestStarGuestUpdateState,
} from './EventSubChannelGuestStarGuestUpdateEvent.external';

@rtfm<EventSubChannelGuestStarGuestUpdateEvent>(
	'eventsub-base',
	'EventSubChannelGuestStarGuestUpdateEvent',
	'broadcasterId',
)
export class EventSubChannelGuestStarGuestUpdateEvent extends DataObject<EventSubChannelGuestStarGuestUpdateEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubChannelGuestStarGuestUpdateEventData, client: ApiClient) {
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
	 * The ID of the moderator.
	 */
	get moderatorId(): string | null {
		return this[rawDataSymbol].moderator_user_id;
	}

	/**
	 * The name of the moderator.
	 */
	get moderatorName(): string | null {
		return this[rawDataSymbol].moderator_user_login;
	}

	/**
	 * The display name of the moderator.
	 */
	get moderatorDisplayName(): string | null {
		return this[rawDataSymbol].moderator_user_name;
	}

	/**
	 * Gets more information about the moderator.
	 */
	async getModerator(): Promise<HelixUser | null> {
		if (!this[rawDataSymbol].moderator_user_id) {
			return null;
		}
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].moderator_user_id));
	}

	/**
	 * The ID of the guest.
	 */
	get guestId(): string | null {
		return this[rawDataSymbol].guest_user_id;
	}

	/**
	 * The name of the guest.
	 */
	get guestName(): string | null {
		return this[rawDataSymbol].guest_user_login;
	}

	/**
	 * The display name of the guest.
	 */
	get guestDisplayName(): string | null {
		return this[rawDataSymbol].guest_user_name;
	}

	/**
	 * Gets more information about the guest.
	 */
	async getGuest(): Promise<HelixUser | null> {
		if (!this[rawDataSymbol].guest_user_id) {
			return null;
		}
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].guest_user_id));
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

	get slotId(): string | null {
		return this[rawDataSymbol].slot_id;
	}

	get state(): EventSubChannelGuestStarGuestUpdateState | null {
		return this[rawDataSymbol].state;
	}

	get hostVideoEnabled(): boolean | null {
		return this[rawDataSymbol].host_video_enabled;
	}

	get hostAudioEnabled(): boolean | null {
		return this[rawDataSymbol].host_audio_enabled;
	}

	get hostVolume(): number | null {
		return this[rawDataSymbol].host_volume;
	}
}
