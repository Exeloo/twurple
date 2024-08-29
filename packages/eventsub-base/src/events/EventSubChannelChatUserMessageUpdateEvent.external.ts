import type { EventSubChatMessageData } from './common/EventSubChatMessage.external';

export type EventSubChannelChatUserMessageUpdateStatus = 'approved' | 'denied' | 'invalid';

/** @private */
export interface EventSubChannelChatUserMessageUpdateEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	user_id: string;
	user_login: string;
	user_name: string;
	status: EventSubChannelChatUserMessageUpdateStatus;
	message_id: string;
	message: EventSubChatMessageData;
}
