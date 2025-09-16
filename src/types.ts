export interface QiitaUser {
	description: string;
	facebook_id: string;
	followees_count: number;
	followers_count: number;
	github_login_name: string | null;
	id: string;
	items_count: number;
	linkedin_id: string;
	location: string;
	name: string;
	organization: string;
	permanent_id: number;
	profile_image_url: string;
	team_only: boolean;
	twitter_screen_name: string | null;
	website_url: string;
}

// エージェントからのMarkdownレスポンス用の型
export interface QiitaUserResponse {
	markdownText: string;
}
