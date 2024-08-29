import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';

import type { EventSubAutomodSettingsUpdateEventData } from './EventSubAutomodSettingsUpdateEvent.external';

@rtfm<EventSubAutomodSettingsUpdateEvent>('eventsub-base', 'EventSubAutomodSettingsUpdateEvent', 'broadcasterId')
export class EventSubAutomodSettingsUpdateEvent extends DataObject<EventSubAutomodSettingsUpdateEventData> {
	/** @internal */ @Enumerable(false) private readonly _client: ApiClient;

	/** @internal */
	constructor(data: EventSubAutomodSettingsUpdateEventData, client: ApiClient) {
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
	get moderatorId(): string {
		return this[rawDataSymbol].moderator_user_id;
	}

	/**
	 * The name of the moderator.
	 */
	get moderatorName(): string {
		return this[rawDataSymbol].moderator_user_login;
	}

	/**
	 * The display name of the moderator.
	 */
	get moderatorDisplayName(): string {
		return this[rawDataSymbol].moderator_user_name;
	}

	/**
	 * Gets more information about the moderator.
	 */
	async getModerator(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].moderator_user_id));
	}

	get bullying(): number {
		return this[rawDataSymbol].bullying;
	}

	get overallLevel(): number | null {
		return this[rawDataSymbol].overall_level;
	}

	get disability(): number {
		return this[rawDataSymbol].disability;
	}

	get raceEthnicityOrReligion(): number {
		return this[rawDataSymbol].race_ethnicity_or_religion;
	}

	get misogyny(): number {
		return this[rawDataSymbol].misogyny;
	}

	get sexualitySexOrGender(): number {
		return this[rawDataSymbol].sexuality_sex_or_gender;
	}

	get aggression(): number {
		return this[rawDataSymbol].aggression;
	}

	get sexBasedTerms(): number {
		return this[rawDataSymbol].sex_based_terms;
	}

	get swearing(): number {
		return this[rawDataSymbol].swearing;
	}
}
