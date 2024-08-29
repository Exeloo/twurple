import type { EventSubChatMessageData } from './common/EventSubChatMessage.external';

/** @private */
export interface EventSubAutomodMessageHoldEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	user_id: string;
	user_login: string;
	user_name: string;
	message_id: string;
	message: EventSubChatMessageData;
	category: string;
	level: number;
	held_at: string;
}
