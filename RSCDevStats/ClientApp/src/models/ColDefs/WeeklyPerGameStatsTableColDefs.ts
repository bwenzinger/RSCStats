import { ColDef } from "ag-grid-community"
import { CaseInsensitiveComparator, nameof } from "../../utils/utils"
import { IndividualGamePlayerStats } from "../CumulativePlayerStats"

const WeeklyPerGameStatsTableColDefs: ColDef[] = [
	{
		checkboxSelection: true,
		headerCheckboxSelection: true,
		pinned: true,
		width: 20,
	},
	{
		headerName: "ReplayId",
		field: nameof<IndividualGamePlayerStats>("ReplayId"),
	},
	{
		headerName: "ReplayTitle",
		field: nameof<IndividualGamePlayerStats>("ReplayTitle"),
	},
	{
		headerName: "Map",
		field: nameof<IndividualGamePlayerStats>("Map"),
	},
	{
		headerName: "Date",
		field: nameof<IndividualGamePlayerStats>("Date"),
	},
	{
		headerName: "Wins",
		field: nameof<IndividualGamePlayerStats>("GamesWon"),
	},
	{ headerName: "Team", field: nameof<IndividualGamePlayerStats>("Team") },
	{
		headerName: "OpponentTeam",
		field: nameof<IndividualGamePlayerStats>("OpponentTeam"),
	},
	{
		headerName: "Name",
		field: nameof<IndividualGamePlayerStats>("Name"),
		pinned: true,
		comparator: CaseInsensitiveComparator,
	},
	{
		headerName: "CarId",
		field: nameof<IndividualGamePlayerStats>("CarId"),
		comparator: CaseInsensitiveComparator,
	},
	{
		headerName: "CarName",
		field: nameof<IndividualGamePlayerStats>("CarName"),
		comparator: CaseInsensitiveComparator,
	},
	// { headerName: "Tier", field: nameof<IndividualGamePlayerStats>("Tier") },
	// {
	// 	headerName: "Losses",
	// 	field: nameof<IndividualGamePlayerStats>("GamesLost"),
	// },
	{ headerName: "Score", field: nameof<IndividualGamePlayerStats>("Score") },
	{ headerName: "Goals", field: nameof<IndividualGamePlayerStats>("Goals") },
	{
		headerName: "Assists",
		field: nameof<IndividualGamePlayerStats>("Assists"),
	},
	{ headerName: "Saves", field: nameof<IndividualGamePlayerStats>("Saves") },
	{ headerName: "Shots", field: nameof<IndividualGamePlayerStats>("Shots") },
	{
		headerName: "ShotsAgainst",
		field: nameof<IndividualGamePlayerStats>("ShotsAgainst"),
	},
	{
		headerName: "GoalsAgainst",
		field: nameof<IndividualGamePlayerStats>("GoalsAgainst"),
	},
	{
		headerName: "GoalsAgainstLastDefender",
		field: nameof<IndividualGamePlayerStats>("GoalsAgainstLastDefender"),
	},
	{
		headerName: "ShootingPercent",
		field: nameof<IndividualGamePlayerStats>("ShootingPercent"),
	},
	{ headerName: "bpm", field: nameof<IndividualGamePlayerStats>("Bpm") },
	{
		headerName: "AvgBoostAmount",
		field: nameof<IndividualGamePlayerStats>("AvgBoostAmount"),
	},
	{
		headerName: "BoostCollected",
		field: nameof<IndividualGamePlayerStats>("BoostCollected"),
	},
	{
		headerName: "BoostCollectedBigPads",
		field: nameof<IndividualGamePlayerStats>("BoostCollectedBigPads"),
	},
	{
		headerName: "BoostCollectedSmallPads",
		field: nameof<IndividualGamePlayerStats>("BoostCollectedSmallPads"),
	},
	{
		headerName: "CountCollectedBigPads",
		field: nameof<IndividualGamePlayerStats>("CountCollectedBigPads"),
	},
	{
		headerName: "CountCollectedSmallPads",
		field: nameof<IndividualGamePlayerStats>("CountCollectedSmallPads"),
	},
	{
		headerName: "BoostStolen",
		field: nameof<IndividualGamePlayerStats>("BoostStolen"),
	},
	{
		headerName: "BoostStolenBigPads",
		field: nameof<IndividualGamePlayerStats>("BoostStolenBigPads"),
	},
	{
		headerName: "BoostStolenSmallPads",
		field: nameof<IndividualGamePlayerStats>("BoostStolenSmallPads"),
	},
	{
		headerName: "CountStolenBigPads",
		field: nameof<IndividualGamePlayerStats>("CountStolenBigPads"),
	},
	{
		headerName: "CountStolenSmallpads",
		field: nameof<IndividualGamePlayerStats>("CountStolenSmallpads"),
	},
	{
		headerName: "ZeroBoostTime",
		field: nameof<IndividualGamePlayerStats>("ZeroBoostTime"),
	},
	{
		headerName: "HundredBoostTime",
		field: nameof<IndividualGamePlayerStats>("HundredBoostTime"),
	},
	{
		headerName: "BoostUsedWhileSupersonic",
		field: nameof<IndividualGamePlayerStats>("BoostUsedWhileSupersonic"),
	},
	{
		headerName: "BoostOverfillTotal",
		field: nameof<IndividualGamePlayerStats>("BoostOverfillTotal"),
	},
	{
		headerName: "BoostOverfillStolen",
		field: nameof<IndividualGamePlayerStats>("BoostOverfillStolen"),
	},
	{
		headerName: "AverageSpeed",
		field: nameof<IndividualGamePlayerStats>("AverageSpeed"),
	},
	{
		headerName: "TotalDistance",
		field: nameof<IndividualGamePlayerStats>("TotalDistance"),
	},
	{
		headerName: "TimeSlowSpeed",
		field: nameof<IndividualGamePlayerStats>("TimeSlowSpeed"),
	},
	{
		headerName: "PercentSlowSpeed",
		field: nameof<IndividualGamePlayerStats>("PercentSlowSpeed"),
	},
	{
		headerName: "TimeBoostSpeed",
		field: nameof<IndividualGamePlayerStats>("TimeBoostSpeed"),
	},
	{
		headerName: "PercentBoostSpeed",
		field: nameof<IndividualGamePlayerStats>("PercentBoostSpeed"),
	},
	{
		headerName: "TimeSupersonic",
		field: nameof<IndividualGamePlayerStats>("TimeSupersonic"),
	},
	{
		headerName: "PercentSupersonic",
		field: nameof<IndividualGamePlayerStats>("PercentSupersonic"),
	},
	{
		headerName: "TimeOnGround",
		field: nameof<IndividualGamePlayerStats>("TimeOnGround"),
	},
	{
		headerName: "PercentOnGround",
		field: nameof<IndividualGamePlayerStats>("PercentOnGround"),
	},
	{
		headerName: "TimeLowAir",
		field: nameof<IndividualGamePlayerStats>("TimeLowAir"),
	},
	{
		headerName: "PercentLowAir",
		field: nameof<IndividualGamePlayerStats>("PercentLowAir"),
	},
	{
		headerName: "TimeHighAir",
		field: nameof<IndividualGamePlayerStats>("TimeHighAir"),
	},
	{
		headerName: "PercentHighAir",
		field: nameof<IndividualGamePlayerStats>("PercentHighAir"),
	},
	{
		headerName: "TimePowerslide",
		field: nameof<IndividualGamePlayerStats>("TimePowerslide"),
	},
	{
		headerName: "AveragePowerslideTime",
		field: nameof<IndividualGamePlayerStats>("AveragePowerslideTime"),
	},
	{
		headerName: "CountPowerslide",
		field: nameof<IndividualGamePlayerStats>("CountPowerslide"),
	},
	{
		headerName: "TimeMostBack",
		field: nameof<IndividualGamePlayerStats>("TimeMostBack"),
	},
	{
		headerName: "PercentMostBack",
		field: nameof<IndividualGamePlayerStats>("PercentMostBack"),
	},
	{
		headerName: "TimeMostForward",
		field: nameof<IndividualGamePlayerStats>("TimeMostForward"),
	},
	{
		headerName: "PercentMostForward",
		field: nameof<IndividualGamePlayerStats>("PercentMostForward"),
	},
	{
		headerName: "TimeInFrontOfBall",
		field: nameof<IndividualGamePlayerStats>("TimeInFrontOfBall"),
	},
	{
		headerName: "PercentInFrontOfBall",
		field: nameof<IndividualGamePlayerStats>("PercentInFrontOfBall"),
	},
	{
		headerName: "TimeBehindBall",
		field: nameof<IndividualGamePlayerStats>("TimeBehindBall"),
	},
	{
		headerName: "PercentBehindBall",
		field: nameof<IndividualGamePlayerStats>("PercentBehindBall"),
	},
	{
		headerName: "Dummy1",
		field: nameof<IndividualGamePlayerStats>("Dummy1"),
	},
	{
		headerName: "Dummy2",
		field: nameof<IndividualGamePlayerStats>("Dummy2"),
	},
	{
		headerName: "TimeDefensiveHalf",
		field: nameof<IndividualGamePlayerStats>("TimeDefensiveHalf"),
	},
	{
		headerName: "PercentDefensiveHalf",
		field: nameof<IndividualGamePlayerStats>("PercentDefensiveHalf"),
	},
	{
		headerName: "TimeOffensiveHalf",
		field: nameof<IndividualGamePlayerStats>("TimeOffensiveHalf"),
	},
	{
		headerName: "PercentOffensiveHalf",
		field: nameof<IndividualGamePlayerStats>("PercentOffensiveHalf"),
	},
	{
		headerName: "TimeDefensiveThird",
		field: nameof<IndividualGamePlayerStats>("TimeDefensiveThird"),
	},
	{
		headerName: "PercentageDefensiveThird",
		field: nameof<IndividualGamePlayerStats>("PercentageDefensiveThird"),
	},
	{
		headerName: "TimeNeutralThird",
		field: nameof<IndividualGamePlayerStats>("TimeNeutralThird"),
	},
	{
		headerName: "PercentNeutralThird",
		field: nameof<IndividualGamePlayerStats>("PercentNeutralThird"),
	},
	{
		headerName: "TimeOffensiveThird",
		field: nameof<IndividualGamePlayerStats>("TimeOffensiveThird"),
	},
	{
		headerName: "PercentOffensiveThird",
		field: nameof<IndividualGamePlayerStats>("PercentOffensiveThird"),
	},
	{
		headerName: "AverageDistanceToBall",
		field: nameof<IndividualGamePlayerStats>("AverageDistanceToBall"),
	},
	{
		headerName: "AverageDistanceToBallHasPossession",
		field: nameof<IndividualGamePlayerStats>(
			"AverageDistanceToBallHasPossession"
		),
	},
	{
		headerName: "AverageDistanceToBallNoPossession",
		field: nameof<IndividualGamePlayerStats>(
			"AverageDistanceToBallNoPossession"
		),
	},
	{
		headerName: "DemosInflicted",
		field: nameof<IndividualGamePlayerStats>("DemosInflicted"),
	},
	{
		headerName: "DemosTaken",
		field: nameof<IndividualGamePlayerStats>("DemosTaken"),
	},
	{ headerName: "RSCId", field: nameof<IndividualGamePlayerStats>("RSCId") },
	{
		headerName: "GameNumber",
		field: nameof<IndividualGamePlayerStats>("GameNumber"),
	},
	{
		headerName: "OnlineId",
		field: nameof<IndividualGamePlayerStats>("OnlineId"),
	},
	{ headerName: "MVP", field: nameof<IndividualGamePlayerStats>("MVP") },
	{ headerName: "Cycle", field: nameof<IndividualGamePlayerStats>("Cycle") },
	{
		headerName: "Hat Tricks",
		field: nameof<IndividualGamePlayerStats>("HatTrick"),
	},
	{
		headerName: "Playmakers",
		field: nameof<IndividualGamePlayerStats>("Playmaker"),
	},
	{ headerName: "Saviors", field: nameof<IndividualGamePlayerStats>("Savior") },
]

export default WeeklyPerGameStatsTableColDefs
