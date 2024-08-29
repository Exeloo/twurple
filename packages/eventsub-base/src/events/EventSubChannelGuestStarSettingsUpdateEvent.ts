import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import type {
	EventSubChannelGuestStarSettingsUpdateEventData,
	EventSubChannelGuestStarSettingsUpdateGroupLayout,
} from './EventSubChannelGuestStarSettingsUpdateEvent.external';

@rtfm<EventSubChannelGuestStarSettingsUpdateEvent>(
	'eventsub-base',
	'EventSubChannelGuestStarSettingsUpdateEvent',
	'broadcasterId',
)
export class EventSubChannelGuestStarSettingsUpdateEvent extends DataObject<EventSubChannelGuestStarSettingsUpdateEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubChannelGuestStarSettingsUpdateEventData, client: ApiClient) {
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

	get isModeratorSendLiveEnabled(): boolean {
		return this[rawDataSymbol].is_moderator_send_live_enabled;
	}

	get slotCount(): number {
		return this[rawDataSymbol].slot_count;
	}

	get isBrowserSourceAudioEnabled(): boolean {
		return this[rawDataSymbol].is_browser_source_audio_enabled;
	}

	get groupLayout(): EventSubChannelGuestStarSettingsUpdateGroupLayout {
		return this[rawDataSymbol].group_layout;
	}
}
