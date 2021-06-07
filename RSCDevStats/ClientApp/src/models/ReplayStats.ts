export interface ReplayStatsRoot {
	count: number
	list?: ReplayStats[] | null
}
export interface ReplayStats {
	id: string
	link: string
	rocket_league_id: string
	replay_title: string
	recorder: string
	map_code: string
	map_name: string
	playlist_id: string
	playlist_name: string
	duration: number
	overtime: boolean
	overtime_seconds: number
	season: number
	season_type: string
	date: string
	date_has_tz: boolean
	visibility: string
	uploader: Uploader
	groups?: GroupsEntity[] | null
	blue: BlueOrOrange
	orange: BlueOrOrange
}
export interface Uploader {
	steam_id: string
	name: string
	profile_url: string
	avatar: string
}
export interface GroupsEntity {
	id: string
	name: string
	link: string
}
export interface BlueOrOrange {
	name: string
	goals: number
	players?: ReplayPlayerStats[] | null
}
export interface ReplayPlayerStats {
	start_time: number
	end_time: number
	name: string
	id: Id
	mvp: boolean
	score: number
}
export interface Id {
	platform: string
	id: string
}
