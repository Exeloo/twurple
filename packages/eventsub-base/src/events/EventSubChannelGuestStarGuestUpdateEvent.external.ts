export type EventSubChannelGuestStarGuestUpdateState =
	| 'invited'
	| 'accepted'
	| 'ready'
	| 'backstage'
	| 'live'
	| 'removed';

/** @private */
export interface EventSubChannelGuestStarGuestUpdateEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	session_id: string;
	moderator_user_id: string | null;
	moderator_user_login: string | null;
	moderator_user_name: string | null;
	guest_user_id: string | null;
	guest_user_login: string | null;
	guest_user_name: string | null;
	slot_id: string | null;
	state: EventSubChannelGuestStarGuestUpdateState | null;
	host_user_id: string | null;
	host_user_login: string | null;
	host_user_name: string | null;
	host_video_enabled: boolean | null;
	host_audio_enabled: boolean | null;
	host_volume: number | null;
}
