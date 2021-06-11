import { ColDef } from "ag-grid-community"
import { nameof } from "../utils/utils"
import { CumulativePlayerStats } from "./CumulativePlayerStats"

const ViewStatsCumulativeStatsTableColDefs: ColDef[] = [
	{
		headerName: "Name",
		field: nameof<CumulativePlayerStats>("Name"),
		pinned: true,
	},
	{ headerName: "RSCId", field: nameof<CumulativePlayerStats>("RSCId") },
	// { headerName: "OnlineId", field: nameof<CumulativePlayerStats>("OnlineId") },
	{ headerName: "Tier", field: nameof<CumulativePlayerStats>("Tier") },
	{ headerName: "Team", field: nameof<CumulativePlayerStats>("Team") },
	{
		headerName: "Games Played",
		field: nameof<CumulativePlayerStats>("GamesPlayed"),
	},
	{ headerName: "Games Won", field: nameof<CumulativePlayerStats>("GamesWon") },
	{
		headerName: "Games Lost",
		field: nameof<CumulativePlayerStats>("GamesLost"),
	},
	{ headerName: "MVPs", field: nameof<CumulativePlayerStats>("MVPs") },
	{ headerName: "Score", field: nameof<CumulativePlayerStats>("Score") },
	{ headerName: "Goals", field: nameof<CumulativePlayerStats>("Goals") },
	{ headerName: "Assists", field: nameof<CumulativePlayerStats>("Assists") },
	{ headerName: "Saves", field: nameof<CumulativePlayerStats>("Saves") },
	{ headerName: "Shots", field: nameof<CumulativePlayerStats>("Shots") },
	{ headerName: "Cycle", field: nameof<CumulativePlayerStats>("Cycle") },
	{ headerName: "HatTrick", field: nameof<CumulativePlayerStats>("HatTrick") },
	{
		headerName: "Playmaker",
		field: nameof<CumulativePlayerStats>("Playmaker"),
	},
	{ headerName: "Savior", field: nameof<CumulativePlayerStats>("Savior") },
	{
		headerName: "GoalsAgainst",
		field: nameof<CumulativePlayerStats>("GoalsAgainst"),
	},
	{
		headerName: "ShotsAgainst",
		field: nameof<CumulativePlayerStats>("ShotsAgainst"),
	},
	{
		headerName: "PointsAgainst",
		field: nameof<CumulativePlayerStats>("PointsAgainst"),
	},
	{
		headerName: "AssistAgainst",
		field: nameof<CumulativePlayerStats>("AssistAgainst"),
	},
	{
		headerName: "SavesAgainst",
		field: nameof<CumulativePlayerStats>("SavesAgainst"),
	},
	{
		headerName: "AvgBoostAmount",
		field: nameof<CumulativePlayerStats>("AvgBoostAmount"),
	},
	{
		headerName: "BoostCollected",
		field: nameof<CumulativePlayerStats>("BoostCollected"),
	},
	{
		headerName: "BoostCollectedBigPads",
		field: nameof<CumulativePlayerStats>("BoostCollectedBigPads"),
	},
	{
		headerName: "BoostCollectedSmallPads",
		field: nameof<CumulativePlayerStats>("BoostCollectedSmallPads"),
	},
	{
		headerName: "CountCollectedBigPads",
		field: nameof<CumulativePlayerStats>("CountCollectedBigPads"),
	},
	{
		headerName: "CountCollectedSmallPads",
		field: nameof<CumulativePlayerStats>("CountCollectedSmallPads"),
	},
	{
		headerName: "BoostStolen",
		field: nameof<CumulativePlayerStats>("BoostStolen"),
	},
	{
		headerName: "BoostStolenBigPads",
		field: nameof<CumulativePlayerStats>("BoostStolenBigPads"),
	},
	{
		headerName: "BoostStolenSmallPads",
		field: nameof<CumulativePlayerStats>("BoostStolenSmallPads"),
	},
	{
		headerName: "CountStolenBigPads",
		field: nameof<CumulativePlayerStats>("CountStolenBigPads"),
	},
	{
		headerName: "CountStolenSmallpads",
		field: nameof<CumulativePlayerStats>("CountStolenSmallpads"),
	},
	{
		headerName: "ZeroBoostTime",
		field: nameof<CumulativePlayerStats>("ZeroBoostTime"),
	},
	{
		headerName: "HundredBoostTime",
		field: nameof<CumulativePlayerStats>("HundredBoostTime"),
	},
	{
		headerName: "BoostUsedWhileSupersonic",
		field: nameof<CumulativePlayerStats>("BoostUsedWhileSupersonic"),
	},
	{
		headerName: "BoostOverfillTotal",
		field: nameof<CumulativePlayerStats>("BoostOverfillTotal"),
	},
	{
		headerName: "BoostOverfillStolen",
		field: nameof<CumulativePlayerStats>("BoostOverfillStolen"),
	},
	{
		headerName: "AverageSpeed",
		field: nameof<CumulativePlayerStats>("AverageSpeed"),
	},
	{
		headerName: "TotalDistance",
		field: nameof<CumulativePlayerStats>("TotalDistance"),
	},
	{
		headerName: "TimeSlowSpeed",
		field: nameof<CumulativePlayerStats>("TimeSlowSpeed"),
	},
	{
		headerName: "PercentSlowSpeed",
		field: nameof<CumulativePlayerStats>("PercentSlowSpeed"),
	},
	{
		headerName: "TimeBoostSpeed",
		field: nameof<CumulativePlayerStats>("TimeBoostSpeed"),
	},
	{
		headerName: "PercentBoostSpeed",
		field: nameof<CumulativePlayerStats>("PercentBoostSpeed"),
	},
	{
		headerName: "TimeSupersonic",
		field: nameof<CumulativePlayerStats>("TimeSupersonic"),
	},
	{
		headerName: "PercentSupersonic",
		field: nameof<CumulativePlayerStats>("PercentSupersonic"),
	},
	{
		headerName: "TimeOnGround",
		field: nameof<CumulativePlayerStats>("TimeOnGround"),
	},
	{
		headerName: "PercentOnGround",
		field: nameof<CumulativePlayerStats>("PercentOnGround"),
	},
	{
		headerName: "TimeLowAir",
		field: nameof<CumulativePlayerStats>("TimeLowAir"),
	},
	{
		headerName: "PercentLowAir",
		field: nameof<CumulativePlayerStats>("PercentLowAir"),
	},
	{
		headerName: "TimeHighAir",
		field: nameof<CumulativePlayerStats>("TimeHighAir"),
	},
	{
		headerName: "PercentHighAir",
		field: nameof<CumulativePlayerStats>("PercentHighAir"),
	},
	{
		headerName: "TimePowerslide",
		field: nameof<CumulativePlayerStats>("TimePowerslide"),
	},
	{
		headerName: "AveragePowerslideTime",
		field: nameof<CumulativePlayerStats>("AveragePowerslideTime"),
	},
	{
		headerName: "CountPowerslide",
		field: nameof<CumulativePlayerStats>("CountPowerslide"),
	},
	{
		headerName: "TimeMostBack",
		field: nameof<CumulativePlayerStats>("TimeMostBack"),
	},
	{
		headerName: "PercentMostBack",
		field: nameof<CumulativePlayerStats>("PercentMostBack"),
	},
	{
		headerName: "TimeMostForward",
		field: nameof<CumulativePlayerStats>("TimeMostForward"),
	},
	{
		headerName: "PercentMostForward",
		field: nameof<CumulativePlayerStats>("PercentMostForward"),
	},
	{
		headerName: "TimeInFrontOfBall",
		field: nameof<CumulativePlayerStats>("TimeInFrontOfBall"),
	},
	{
		headerName: "PercentInFrontOfBall",
		field: nameof<CumulativePlayerStats>("PercentInFrontOfBall"),
	},
	{
		headerName: "TimeDefensiveHalf",
		field: nameof<CumulativePlayerStats>("TimeDefensiveHalf"),
	},
	{
		headerName: "PercentDefensiveHalf",
		field: nameof<CumulativePlayerStats>("PercentDefensiveHalf"),
	},
	{
		headerName: "TimeOffensiveHalf",
		field: nameof<CumulativePlayerStats>("TimeOffensiveHalf"),
	},
	{
		headerName: "PercentOffensiveHalf",
		field: nameof<CumulativePlayerStats>("PercentOffensiveHalf"),
	},
	{
		headerName: "TimeDefensiveThird",
		field: nameof<CumulativePlayerStats>("TimeDefensiveThird"),
	},
	{
		headerName: "PercentageDefensiveThird",
		field: nameof<CumulativePlayerStats>("PercentageDefensiveThird"),
	},
	{
		headerName: "TimeNeutralThird",
		field: nameof<CumulativePlayerStats>("TimeNeutralThird"),
	},
	{
		headerName: "PercentNeutralThird",
		field: nameof<CumulativePlayerStats>("PercentNeutralThird"),
	},
	{
		headerName: "TimeOffensiveThird",
		field: nameof<CumulativePlayerStats>("TimeOffensiveThird"),
	},
	{
		headerName: "PercentOffensiveThird",
		field: nameof<CumulativePlayerStats>("PercentOffensiveThird"),
	},
	{
		headerName: "AverageDistanceToBall",
		field: nameof<CumulativePlayerStats>("AverageDistanceToBall"),
	},
	{
		headerName: "AverageDistanceToBallHasPossession",
		field: nameof<CumulativePlayerStats>("AverageDistanceToBallHasPossession"),
	},
	{
		headerName: "AverageDistanceToBallNoPossession",
		field: nameof<CumulativePlayerStats>("AverageDistanceToBallNoPossession"),
	},
	{
		headerName: "DemosInflicted",
		field: nameof<CumulativePlayerStats>("DemosInflicted"),
	},
	{
		headerName: "DemosTaken",
		field: nameof<CumulativePlayerStats>("DemosTaken"),
	},
	{ headerName: "LossMVP", field: nameof<CumulativePlayerStats>("LossMVP") },
]

export default ViewStatsCumulativeStatsTableColDefs
