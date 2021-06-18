import { ColDef } from "ag-grid-community"
import { CaseInsensitiveComparator, nameof } from "../../utils/utils"
import { IndividualGamePlayerStats } from "../CumulativePlayerStats"

const ViewStatsPerGameStatsTableColDefs: ColDef[] = [
	{
		headerName: "Name",
		field: nameof<IndividualGamePlayerStats>("Name"),
		pinned: true,
		comparator: CaseInsensitiveComparator,
	},
	{ headerName: "RSCId", field: nameof<IndividualGamePlayerStats>("RSCId") },
	{
		headerName: "Week",
		field: nameof<IndividualGamePlayerStats>("Week"),
	},
	{
		headerName: "Tier",
		field: nameof<IndividualGamePlayerStats>("Tier"),
	},
	{
		headerName: "Team",
		field: nameof<IndividualGamePlayerStats>("Team"),
	},
	{
		headerName: "OponentTeam",
		field: nameof<IndividualGamePlayerStats>("OponentTeam"),
	},
	{
		headerName: "GamesWon",
		field: nameof<IndividualGamePlayerStats>("GamesWon"),
	},
	{
		headerName: "GamesLost",
		field: nameof<IndividualGamePlayerStats>("GamesLost"),
	},
	{ headerName: "Score", field: nameof<IndividualGamePlayerStats>("Score") },
	{ headerName: "Goals", field: nameof<IndividualGamePlayerStats>("Goals") },
	{
		headerName: "Assists",
		field: nameof<IndividualGamePlayerStats>("Assists"),
	},
	{ headerName: "Saves", field: nameof<IndividualGamePlayerStats>("Saves") },
	{ headerName: "Shots", field: nameof<IndividualGamePlayerStats>("Shots") },
	{ headerName: "MVP", field: nameof<IndividualGamePlayerStats>("MVP") },
	{ headerName: "Cycle", field: nameof<IndividualGamePlayerStats>("Cycle") },
	{
		headerName: "HatTrick",
		field: nameof<IndividualGamePlayerStats>("HatTrick"),
	},
	{
		headerName: "Playmaker",
		field: nameof<IndividualGamePlayerStats>("Playmaker"),
	},
	{ headerName: "Savior", field: nameof<IndividualGamePlayerStats>("Savior") },
	{
		headerName: "PointsAgainst",
		field: nameof<IndividualGamePlayerStats>("PointsAgainst"),
	},
	{
		headerName: "GoalsAgainst",
		field: nameof<IndividualGamePlayerStats>("GoalsAgainst"),
	},
	{
		headerName: "AssistAgainst",
		field: nameof<IndividualGamePlayerStats>("AssistAgainst"),
	},
	{
		headerName: "SavesAgainst",
		field: nameof<IndividualGamePlayerStats>("SavesAgainst"),
	},
	{
		headerName: "ShotsAgainst",
		field: nameof<IndividualGamePlayerStats>("ShotsAgainst"),
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
	{
		headerName: "LossMVP",
		field: nameof<IndividualGamePlayerStats>("LossMVP"),
	},
]

export default ViewStatsPerGameStatsTableColDefs
