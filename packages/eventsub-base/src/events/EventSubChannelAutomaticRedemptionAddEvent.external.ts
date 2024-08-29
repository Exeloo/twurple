export type EventSubChannelAutomaticRedemptionAddRewardType =
	| 'single_message_bypass_sub_mode'
	| 'send_highlighted_message'
	| 'random_sub_emote_unlock'
	| 'chosen_sub_emote_unlock'
	| 'chosen_modified_sub_emote_unlock'
	| 'message_effect'
	| 'gigantify_an_emote'
	| 'celebration';

export interface IEventSubChannelAutomaticRedemptionAddReward {
	type: EventSubChannelAutomaticRedemptionAddRewardType;
	cost: number;
	unlocked_emote: {
		id: string;
		name: string;
	};
}

export interface IEventSubChannelAutomaticRedemptionAddMessage {
	text: string;
	emotes: Array<{
		id: string;
		begin: number;
		end: number;
	}>;
}

/** @private */
export interface EventSubChannelAutomaticRedemptionAddEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	user_id: string;
	user_login: string;
	user_name: string;
	id: string;
	reward: IEventSubChannelAutomaticRedemptionAddReward;
	message: IEventSubChannelAutomaticRedemptionAddMessage;
	user_input: string;
	redeemed_at: string;
}
