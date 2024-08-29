import type { EventSubChannelSuspiciousUserMessageLowTrustStatus } from './EventSubChannelSuspiciousUserMessageEvent.external';

/** @private */
export interface EventSubChannelSuspiciousUserUpdateEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	moderator_user_id: string;
	moderator_user_login: string;
	moderator_user_name: string;
	user_id: string;
	user_login: string;
	user_name: string;
	low_trust_status: EventSubChannelSuspiciousUserMessageLowTrustStatus;
}
