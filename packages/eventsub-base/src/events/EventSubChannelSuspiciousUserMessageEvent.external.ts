import type { EventSubChatMessageData } from './common/EventSubChatMessage.external';

export type EventSubChannelSuspiciousUserMessageLowTrustStatus = 'none' | 'active_monitoring' | 'restricted';

export type EventSubChannelSuspiciousUserMessageType = 'manual' | 'ban_evader_detector' | 'shared_channel_ban';

export type EventSubChannelSuspiciousUserMessageBanEvasionEvaluation = 'unknown' | 'possible' | 'likely';

export interface IEventSubChannelSuspiciousUserMessageMessage extends EventSubChatMessageData {
	message_id: string;
}

/** @private */
export interface EventSubChannelSuspiciousUserMessageEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	user_id: string;
	user_login: string;
	user_name: string;
	low_trust_status: EventSubChannelSuspiciousUserMessageLowTrustStatus;
	shared_ban_channel_ids: string[];
	types: EventSubChannelSuspiciousUserMessageType[];
	ban_evasion_evaluation: EventSubChannelSuspiciousUserMessageBanEvasionEvaluation;
	message: IEventSubChannelSuspiciousUserMessageMessage;
}
