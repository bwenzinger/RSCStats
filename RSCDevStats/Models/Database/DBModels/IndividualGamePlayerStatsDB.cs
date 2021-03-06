using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace RSCWebApi
{
    public class IndividualGamePlayerStatsForGoogleSheets
    {
		public List<object> ValuesToArray()
        {
			var toReturn = new List<object>();
			PropertyInfo[] properties = typeof(IndividualGamePlayerStatsForGoogleSheets).GetProperties();
			foreach (PropertyInfo property in properties)
			{
				toReturn.Add(property.GetValue(this, null));
			}
			return toReturn;
        }

		public string RSCId { get; set; }
		public string Name { get; set; }
		public string Team { get; set; }
		public int Day { get; set; }
		public int GameNumber { get; set; }
		public int DivisionMatchAndWin { get; set; }
		public int GamesWon { get; set; }
		public int GamesLost { get; set; }
		public bool MVP { get; set; }
		public int Score { get; set; }
        //public string ReplayId { get; set; }
        //public string ReplayTitle { get; set; }
        //public string Map { get; set; }
        //public string Date { get; set; }

        //public string OnlineId { get; set; }
        //public string Tier { get; set; }
        //public string OpponentTeam { get; set; }
        //public int CarId { get; set; }
        //public string CarName { get; set; }
        public int Goals { get; set; }
		public int Assists { get; set; }
		public int Saves { get; set; }
		public int Shots { get; set; }
		public int Cycle { get; set; }
		public int HatTrick { get; set; }
		public int Playmaker { get; set; }
		public int Savior { get; set; }
		public int PointsAgainst { get; set; }
		public int GoalsAgainst { get; set; }
		public int AssistAgainst { get; set; }
		public int SavesAgainst { get; set; }
		public int ShotsAgainst { get; set; }
		public string OpponentTeam { get; set; }
		public string Tier { get; set; }
		public int FFGames { get; set; }
		public double bpm { get; set; }
		public double AvgBoostAmount { get; set; }
		public int BoostCollected { get; set; }
		public int BoostCollectedBigPads { get; set; }
		public int BoostCollectedSmallPads { get; set; }
		public int CountCollectedBigPads { get; set; }
		public int CountCollectedSmallPads { get; set; }
		public int BoostStolen { get; set; }
		public int BoostStolenBigPads { get; set; }
		public int BoostStolenSmallPads { get; set; }
		public int CountStolenBigPads { get; set; }
		public int CountStolenSmallpads { get; set; }
		public double ZeroBoostTime { get; set; }
		public double HundredBoostTime { get; set; }
		public int BoostUsedWhileSupersonic { get; set; }
		public int BoostOverfillTotal { get; set; }
		public int BoostOverfillStolen { get; set; }
		public double AverageSpeed { get; set; }
		public double TotalDistance { get; set; }
		public double TimeSlowSpeed { get; set; }
		public double PercentSlowSpeed { get; set; }
		public double TimeBoostSpeed { get; set; }
		public double PercentBoostSpeed { get; set; }
		public double TimeSupersonic { get; set; }
		public double PercentSupersonic { get; set; }
		public double TimeOnGround { get; set; }
		public double PercentOnGround { get; set; }
		public double TimeLowAir { get; set; }
		public double PercentLowAir { get; set; }
		public double TimeHighAir { get; set; }
		public double PercentHighAir { get; set; }
		public double TimePowerslide { get; set; }
		public double AveragePowerslideTime { get; set; }
		public int CountPowerslide { get; set; }
		public double TimeMostBack { get; set; }
		public double PercentMostBack { get; set; }
		public double TimeMostForward { get; set; }
		public double PercentMostForward { get; set; }
		public double TimeInFrontOfBall { get; set; }
		public double PercentInFrontOfBall { get; set; }
		public double TimeBehindBall { get; set; }
		public double PercentBehindBall { get; set; }
		public string Dummy1 { get; set; }
		public string Dummy2 { get; set; }
		public double TimeDefensiveHalf { get; set; }
		public double PercentDefensiveHalf { get; set; }
		public double TimeOffensiveHalf { get; set; }
		public double PercentOffensiveHalf { get; set; }
		public double TimeDefensiveThird { get; set; }
		public double PercentageDefensiveThird { get; set; }
		public double TimeNeutralThird { get; set; }
		public double PercentNeutralThird { get; set; }
		public double TimeOffensiveThird { get; set; }
		public double PercentOffensiveThird { get; set; }
		public double AverageDistanceToBall { get; set; }
		public double AverageDistanceToBallHasPossession { get; set; }
		public double AverageDistanceToBallNoPossession { get; set; }
		public int DemosInflicted { get; set; }
		public int DemosTaken { get; set; }
		public bool LossMVP { get; set; }
	}
}
