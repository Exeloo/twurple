import type { EventSubChatMessageData } from './common/EventSubChatMessage.external';

/** @private */
export interface EventSubChannelChatUserMessageHoldEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	user_id: string;
	user_login: string;
	user_name: string;
	message_id: string;
	message: EventSubChatMessageData;
}
