export interface BallChasingReplay {
	id?: string
	link?: string
	created?: string
	uploader?: BallChasingReplayUploader
	status?: string
	rocket_league_id?: string
	match_guid?: string
	title?: string
	map_code?: string
	match_type?: string
	team_size?: number
	playlist_id?: string
	duration?: number
	overtime?: boolean
	season?: number
	season_type?: string
	// date?: string
	date_has_timezone?: boolean
	visibility?: string
	groups?: BallChasingReplayGroupsEntity[] | null
	blue?: BallChasingReplayBlueOrange
	orange?: BallChasingReplayBlueOrange
	playlist_name?: string
	map_name?: string
}
export interface BallChasingReplayUploader {
	steam_id: string
	name: string
	profile_url: string
	avatar: string
}
export interface BallChasingReplayGroupsEntity {
	id: string
	name: string
	link: string
}
export interface BallChasingReplayBlueOrange {
	color: string
	name: string
	players?: BallChasingReplayPlayersEntity[] | null
	stats: BallChasingReplayStats
}
export interface BallChasingReplayPlayersEntity {
	start_time: number
	end_time: number
	name: string
	id: BallChasingReplayId
	mvp?: boolean | null
	car_id: number
	car_name: string
	camera: BallChasingReplayCamera
	steering_sensitivity: number
	stats: BallChasingReplayStats1
}
export interface BallChasingReplayId {
	platform: string
	id: string
}
export interface BallChasingReplayCamera {
	fov: number
	height: number
	pitch: number
	distance: number
	stiffness: number
	swivel_speed: number
	transition_speed: number
}
export interface BallChasingReplayStats1 {
	core: BallChasingReplayCore
	boost: BallChasingReplayBoost
	movement: BallChasingReplayMovement
	positioning: BallChasingReplayPositioning
	demo: BallChasingReplayDemo
}
export interface BallChasingReplayCore {
	shots: number
	shots_against: number
	goals: number
	goals_against: number
	saves: number
	assists: number
	score: number
	mvp: boolean
	shooting_percentage: number
}
export interface BallChasingReplayBoost {
	bpm: number
	bcpm: number
	avg_amount: number
	amount_collected: number
	amount_stolen: number
	amount_collected_big: number
	amount_stolen_big: number
	amount_collected_small: number
	amount_stolen_small: number
	count_collected_big: number
	count_stolen_big: number
	count_collected_small: number
	count_stolen_small: number
	amount_overfill: number
	amount_overfill_stolen: number
	amount_used_while_supersonic: number
	time_zero_boost: number
	percent_zero_boost: number
	time_full_boost: number
	percent_full_boost: number
	time_boost_0_25: number
	time_boost_25_50: number
	time_boost_50_75: number
	time_boost_75_100: number
	percent_boost_0_25: number
	percent_boost_25_50: number
	percent_boost_50_75: number
	percent_boost_75_100: number
}
export interface BallChasingReplayMovement {
	avg_speed: number
	total_distance: number
	time_supersonic_speed: number
	time_boost_speed: number
	time_slow_speed: number
	time_ground: number
	time_low_air: number
	time_high_air: number
	time_powerslide: number
	count_powerslide: number
	avg_powerslide_duration: number
	avg_speed_percentage: number
	percent_slow_speed: number
	percent_boost_speed: number
	percent_supersonic_speed: number
	percent_ground: number
	percent_low_air: number
	percent_high_air: number
}
export interface BallChasingReplayPositioning {
	avg_distance_to_ball: number
	avg_distance_to_ball_possession: number
	avg_distance_to_ball_no_possession: number
	avg_distance_to_mates: number
	time_defensive_third: number
	time_neutral_third: number
	time_offensive_third: number
	time_defensive_half: number
	time_offensive_half: number
	time_behind_ball: number
	time_infront_ball: number
	time_most_back: number
	time_most_forward: number
	time_closest_to_ball: number
	time_farthest_from_ball: number
	percent_defensive_third: number
	percent_offensive_third: number
	percent_neutral_third: number
	percent_defensive_half: number
	percent_offensive_half: number
	percent_behind_ball: number
	percent_infront_ball: number
	percent_most_back: number
	percent_most_forward: number
	percent_closest_to_ball: number
	percent_farthest_from_ball: number
	goals_against_while_last_defender?: number | null
}
export interface BallChasingReplayDemo {
	inflicted: number
	taken: number
}
export interface BallChasingReplayStats {
	ball: BallChasingReplayBall
	core: BallChasingReplayCore1
	boost: BallChasingReplayBoost1
	movement: BallChasingReplayMovement1
	positioning: BallChasingReplayPositioning1
	demo: BallChasingReplayDemo
}
export interface BallChasingReplayBall {
	possession_time: number
	time_in_side: number
}
export interface BallChasingReplayCore1 {
	shots: number
	shots_against: number
	goals: number
	goals_against: number
	saves: number
	assists: number
	score: number
	shooting_percentage: number
}
export interface BallChasingReplayBoost1 {
	bpm: number
	bcpm: number
	avg_amount: number
	amount_collected: number
	amount_stolen: number
	amount_collected_big: number
	amount_stolen_big: number
	amount_collected_small: number
	amount_stolen_small: number
	count_collected_big: number
	count_stolen_big: number
	count_collected_small: number
	count_stolen_small: number
	amount_overfill: number
	amount_overfill_stolen: number
	amount_used_while_supersonic: number
	time_zero_boost: number
	time_full_boost: number
	time_boost_0_25: number
	time_boost_25_50: number
	time_boost_50_75: number
	time_boost_75_100: number
}
export interface BallChasingReplayMovement1 {
	total_distance: number
	time_supersonic_speed: number
	time_boost_speed: number
	time_slow_speed: number
	time_ground: number
	time_low_air: number
	time_high_air: number
	time_powerslide: number
	count_powerslide: number
}
export interface BallChasingReplayPositioning1 {
	time_defensive_third: number
	time_neutral_third: number
	time_offensive_third: number
	time_defensive_half: number
	time_offensive_half: number
	time_behind_ball: number
	time_infront_ball: number
}
export interface BallChasingReplayPlayersEntity1 {
	start_time: number
	end_time: number
	name: string
	id: BallChasingReplayId
	car_id: number
	car_name: string
	camera: BallChasingReplayCamera
	steering_sensitivity: number
	stats: BallChasingReplayStats1
}
