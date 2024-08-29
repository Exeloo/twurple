export type EventSubChannelGuestStarSettingsUpdateGroupLayout =
	| 'tiled'
	| 'screenshare'
	| 'horizontal_top'
	| 'horizontal_bottom'
	| 'vertical_left'
	| 'vertical_right';

/** @private */
export interface EventSubChannelGuestStarSettingsUpdateEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	is_moderator_send_live_enabled: boolean;
	slot_count: number;
	is_browser_source_audio_enabled: boolean;
	group_layout: EventSubChannelGuestStarSettingsUpdateGroupLayout;
}
