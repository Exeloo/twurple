export type EventSubAutomodTermsUpdateAction = 'add_permitted' | 'remove_permitted' | 'add_blocked' | 'remove_blocked';

/** @private */
export interface EventSubAutomodTermsUpdateEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	moderator_user_id: string;
	moderator_user_login: string;
	moderator_user_name: string;
	action: EventSubAutomodTermsUpdateAction;
	from_automod: boolean;
	terms: string[];
}
