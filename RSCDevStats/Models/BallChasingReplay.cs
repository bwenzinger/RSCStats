using System;
using System.Collections.Generic;

namespace RSCWebApi
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class BallChasingReplayBoostUploader
    {
        public string steam_id { get; set; }
        public string name { get; set; }
        public string profile_url { get; set; }
        public string avatar { get; set; }
    }

    public class BallChasingReplayBoostGroup
    {
        public string id { get; set; }
        public string name { get; set; }
        public string link { get; set; }
    }

    public class BallChasingReplayBoostId
    {
        public string platform { get; set; }
        public string id { get; set; }
    }

    public class Camera
    {
        public int fov { get; set; }
        public int height { get; set; }
        public int pitch { get; set; }
        public int distance { get; set; }
        public double stiffness { get; set; }
        public double swivel_speed { get; set; }
        public double transition_speed { get; set; }
    }

    public class BallChasingReplayCore
    {
        public int shots { get; set; }
        public int shots_against { get; set; }
        public int goals { get; set; }
        public int goals_against { get; set; }
        public int saves { get; set; }
        public int assists { get; set; }
        public int score { get; set; }
        public bool mvp { get; set; }
        public int shooting_percentage { get; set; }
    }

    public class BallChasingReplayBoost
    {
        public int bpm { get; set; }
        public double bcpm { get; set; }
        public double avg_amount { get; set; }
        public int amount_collected { get; set; }
        public int amount_stolen { get; set; }
        public int amount_collected_big { get; set; }
        public int amount_stolen_big { get; set; }
        public int amount_collected_small { get; set; }
        public int amount_stolen_small { get; set; }
        public int count_collected_big { get; set; }
        public int count_stolen_big { get; set; }
        public int count_collected_small { get; set; }
        public int count_stolen_small { get; set; }
        public int amount_overfill { get; set; }
        public int amount_overfill_stolen { get; set; }
        public int amount_used_while_supersonic { get; set; }
        public double time_zero_boost { get; set; }
        public double percent_zero_boost { get; set; }
        public double time_full_boost { get; set; }
        public double percent_full_boost { get; set; }
        public double time_boost_0_25 { get; set; }
        public double time_boost_25_50 { get; set; }
        public double time_boost_50_75 { get; set; }
        public double time_boost_75_100 { get; set; }
        public double percent_boost_0_25 { get; set; }
        public double percent_boost_25_50 { get; set; }
        public double percent_boost_50_75 { get; set; }
        public double percent_boost_75_100 { get; set; }
    }

    public class BallChasingReplayMovement
    {
        public int avg_speed { get; set; }
        public int total_distance { get; set; }
        public double time_supersonic_speed { get; set; }
        public double time_boost_speed { get; set; }
        public double time_slow_speed { get; set; }
        public double time_ground { get; set; }
        public double time_low_air { get; set; }
        public double time_high_air { get; set; }
        public double time_powerslide { get; set; }
        public int count_powerslide { get; set; }
        public double avg_powerslide_duration { get; set; }
        public double avg_speed_percentage { get; set; }
        public double percent_slow_speed { get; set; }
        public double percent_boost_speed { get; set; }
        public double percent_supersonic_speed { get; set; }
        public double percent_ground { get; set; }
        public double percent_low_air { get; set; }
        public double percent_high_air { get; set; }
    }

    public class BallChasingReplayPositioning
    {
        public int avg_distance_to_ball { get; set; }
        public int avg_distance_to_ball_possession { get; set; }
        public int avg_distance_to_ball_no_possession { get; set; }
        public int avg_distance_to_mates { get; set; }
        public double time_defensive_third { get; set; }
        public double time_neutral_third { get; set; }
        public double time_offensive_third { get; set; }
        public double time_defensive_half { get; set; }
        public double time_offensive_half { get; set; }
        public double time_behind_ball { get; set; }
        public double time_infront_ball { get; set; }
        public double time_most_back { get; set; }
        public double time_most_forward { get; set; }
        public double time_closest_to_ball { get; set; }
        public double time_farthest_from_ball { get; set; }
        public double percent_defensive_third { get; set; }
        public double percent_offensive_third { get; set; }
        public double percent_neutral_third { get; set; }
        public double percent_defensive_half { get; set; }
        public double percent_offensive_half { get; set; }
        public double percent_behind_ball { get; set; }
        public double percent_infront_ball { get; set; }
        public double percent_most_back { get; set; }
        public double percent_most_forward { get; set; }
        public double percent_closest_to_ball { get; set; }
        public double percent_farthest_from_ball { get; set; }
        public int? goals_against_while_last_defender { get; set; }
    }

    public class BallChasingReplayDemo
    {
        public int inflicted { get; set; }
        public int taken { get; set; }
    }

    public class Stats
    {
        public BallChasingReplayCore core { get; set; }
        public BallChasingReplayBoost boost { get; set; }
        public BallChasingReplayMovement movement { get; set; }
        public BallChasingReplayPositioning positioning { get; set; }
        public BallChasingReplayDemo demo { get; set; }
        public Ball ball { get; set; }
    }

    public class Player
    {
        public int start_time { get; set; }
        public double end_time { get; set; }
        public string name { get; set; }
        public Id id { get; set; }
        public bool mvp { get; set; }
        public int car_id { get; set; }
        public string car_name { get; set; }
        public Camera camera { get; set; }
        public double steering_sensitivity { get; set; }
        public Stats stats { get; set; }
    }

    public class Ball
    {
        public double possession_time { get; set; }
        public double time_in_side { get; set; }
    }

    public class BallChasingReplayBlue
    {
        public string color { get; set; }
        public string name { get; set; }
        public List<Player> players { get; set; }
        public Stats stats { get; set; }
    }

    public class BallChasingReplayOrange
    {
        public string color { get; set; }
        public string name { get; set; }
        public List<Player> players { get; set; }
        public Stats stats { get; set; }
    }

    public class BallChasingReplay
    {
        public string id { get; set; }
        public string link { get; set; }
        //public DateTime created { get; set; }
        public Uploader uploader { get; set; }
        public string status { get; set; }
        public string rocket_league_id { get; set; }
        public string match_guid { get; set; }
        public string title { get; set; }
        public string map_code { get; set; }
        public string match_type { get; set; }
        public int team_size { get; set; }
        public string playlist_id { get; set; }
        public int duration { get; set; }
        public bool overtime { get; set; }
        public int season { get; set; }
        public string season_type { get; set; }
        //public DateTime date { get; set; }
        public bool date_has_timezone { get; set; }
        public string visibility { get; set; }
        public List<Group> groups { get; set; }
        public BallChasingReplayBlue blue { get; set; }
        public BallChasingReplayOrange orange { get; set; }
        public string playlist_name { get; set; }
        public string map_name { get; set; }
    }


}
