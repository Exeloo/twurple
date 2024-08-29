/** @private */
export interface EventSubAutomodSettingsUpdateEventData {
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	moderator_user_id: string;
	moderator_user_login: string;
	moderator_user_name: string;
	bullying: number;
	overall_level: number | null;
	disability: number;
	race_ethnicity_or_religion: number;
	misogyny: number;
	sexuality_sex_or_gender: number;
	aggression: number;
	sex_based_terms: number;
	swearing: number;
}
