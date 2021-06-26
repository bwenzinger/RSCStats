import { ColDef } from "ag-grid-community"
import { NumberValueFormatter } from "../../components/common/NumberValueFormatter"
import { CaseInsensitiveComparator, nameof } from "../../utils/utils"
import { CumulativePlayerStats } from "../CumulativePlayerStats"

const ViewStatsCumulativeStatsTableColDefs: ColDef[] = [
	{
		headerName: "Name",
		field: nameof<CumulativePlayerStats>("Name"),
		pinned: true,
		comparator: CaseInsensitiveComparator,
	},
	{ headerName: "RSCId", field: nameof<CumulativePlayerStats>("RSCId") },
	// { headerName: "OnlineId", field: nameof<CumulativePlayerStats>("OnlineId") },
	{ headerName: "Tier", field: nameof<CumulativePlayerStats>("Tier") },
	{ headerName: "Team", field: nameof<CumulativePlayerStats>("Team") },
	{
		headerName: "GP",
		field: nameof<CumulativePlayerStats>("GamesPlayed"),
	},
	{ headerName: "GW", field: nameof<CumulativePlayerStats>("GamesWon") },
	{
		headerName: "GL",
		field: nameof<CumulativePlayerStats>("GamesLost"),
	},
	{
		headerName: "Win%",
		field: nameof<CumulativePlayerStats>("WinPercent"),
		valueFormatter: NumberValueFormatter,
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
		valueFormatter: NumberValueFormatter,
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
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "HundredBoostTime",
		field: nameof<CumulativePlayerStats>("HundredBoostTime"),
		valueFormatter: NumberValueFormatter,
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
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TotalDistance",
		field: nameof<CumulativePlayerStats>("TotalDistance"),
	},
	{
		headerName: "TimeSlowSpeed",
		field: nameof<CumulativePlayerStats>("TimeSlowSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentSlowSpeed",
		field: nameof<CumulativePlayerStats>("PercentSlowSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeBoostSpeed",
		field: nameof<CumulativePlayerStats>("TimeBoostSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentBoostSpeed",
		field: nameof<CumulativePlayerStats>("PercentBoostSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeSupersonic",
		field: nameof<CumulativePlayerStats>("TimeSupersonic"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentSupersonic",
		field: nameof<CumulativePlayerStats>("PercentSupersonic"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeOnGround",
		field: nameof<CumulativePlayerStats>("TimeOnGround"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentOnGround",
		field: nameof<CumulativePlayerStats>("PercentOnGround"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeLowAir",
		field: nameof<CumulativePlayerStats>("TimeLowAir"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentLowAir",
		field: nameof<CumulativePlayerStats>("PercentLowAir"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeHighAir",
		field: nameof<CumulativePlayerStats>("TimeHighAir"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentHighAir",
		field: nameof<CumulativePlayerStats>("PercentHighAir"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimePowerslide",
		field: nameof<CumulativePlayerStats>("TimePowerslide"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AveragePowerslideTime",
		field: nameof<CumulativePlayerStats>("AveragePowerslideTime"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "CountPowerslide",
		field: nameof<CumulativePlayerStats>("CountPowerslide"),
	},
	{
		headerName: "TimeMostBack",
		field: nameof<CumulativePlayerStats>("TimeMostBack"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentMostBack",
		field: nameof<CumulativePlayerStats>("PercentMostBack"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeMostForward",
		field: nameof<CumulativePlayerStats>("TimeMostForward"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentMostForward",
		field: nameof<CumulativePlayerStats>("PercentMostForward"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeInFrontOfBall",
		field: nameof<CumulativePlayerStats>("TimeInFrontOfBall"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentInFrontOfBall",
		field: nameof<CumulativePlayerStats>("PercentInFrontOfBall"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeDefensiveHalf",
		field: nameof<CumulativePlayerStats>("TimeDefensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentDefensiveHalf",
		field: nameof<CumulativePlayerStats>("PercentDefensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeOffensiveHalf",
		field: nameof<CumulativePlayerStats>("TimeOffensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentOffensiveHalf",
		field: nameof<CumulativePlayerStats>("PercentOffensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeDefensiveThird",
		field: nameof<CumulativePlayerStats>("TimeDefensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentageDefensiveThird",
		field: nameof<CumulativePlayerStats>("PercentageDefensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeNeutralThird",
		field: nameof<CumulativePlayerStats>("TimeNeutralThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentNeutralThird",
		field: nameof<CumulativePlayerStats>("PercentNeutralThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeOffensiveThird",
		field: nameof<CumulativePlayerStats>("TimeOffensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentOffensiveThird",
		field: nameof<CumulativePlayerStats>("PercentOffensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AverageDistanceToBall",
		field: nameof<CumulativePlayerStats>("AverageDistanceToBall"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AverageDistanceToBallHasPossession",
		field: nameof<CumulativePlayerStats>("AverageDistanceToBallHasPossession"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AverageDistanceToBallNoPossession",
		field: nameof<CumulativePlayerStats>("AverageDistanceToBallNoPossession"),
		valueFormatter: NumberValueFormatter,
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
