import { ColDef } from "ag-grid-community"
import { NumberValueFormatter } from "../../components/common/NumberValueFormatter"
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
		headerName: "Day",
		field: nameof<IndividualGamePlayerStats>("Day"),
	},
	{
		headerName: "#",
		field: nameof<IndividualGamePlayerStats>("GameNumber"),
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
		headerName: "OpponentTeam",
		field: nameof<IndividualGamePlayerStats>("OpponentTeam"),
	},
	{
		headerName: "GW",
		field: nameof<IndividualGamePlayerStats>("GamesWon"),
	},
	{
		headerName: "GL",
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
		valueFormatter: NumberValueFormatter,
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
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "HundredBoostTime",
		field: nameof<IndividualGamePlayerStats>("HundredBoostTime"),
		valueFormatter: NumberValueFormatter,
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
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TotalDistance",
		field: nameof<IndividualGamePlayerStats>("TotalDistance"),
	},
	{
		headerName: "TimeSlowSpeed",
		field: nameof<IndividualGamePlayerStats>("TimeSlowSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentSlowSpeed",
		field: nameof<IndividualGamePlayerStats>("PercentSlowSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeBoostSpeed",
		field: nameof<IndividualGamePlayerStats>("TimeBoostSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentBoostSpeed",
		field: nameof<IndividualGamePlayerStats>("PercentBoostSpeed"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeSupersonic",
		field: nameof<IndividualGamePlayerStats>("TimeSupersonic"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentSupersonic",
		field: nameof<IndividualGamePlayerStats>("PercentSupersonic"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeOnGround",
		field: nameof<IndividualGamePlayerStats>("TimeOnGround"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentOnGround",
		field: nameof<IndividualGamePlayerStats>("PercentOnGround"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeLowAir",
		field: nameof<IndividualGamePlayerStats>("TimeLowAir"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentLowAir",
		field: nameof<IndividualGamePlayerStats>("PercentLowAir"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeHighAir",
		field: nameof<IndividualGamePlayerStats>("TimeHighAir"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimePowerslide",
		field: nameof<IndividualGamePlayerStats>("TimePowerslide"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AveragePowerslideTime",
		field: nameof<IndividualGamePlayerStats>("AveragePowerslideTime"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "CountPowerslide",
		field: nameof<IndividualGamePlayerStats>("CountPowerslide"),
	},
	{
		headerName: "TimeMostBack",
		field: nameof<IndividualGamePlayerStats>("TimeMostBack"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentMostBack",
		field: nameof<IndividualGamePlayerStats>("PercentMostBack"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeMostForward",
		field: nameof<IndividualGamePlayerStats>("TimeMostForward"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentMostForward",
		field: nameof<IndividualGamePlayerStats>("PercentMostForward"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeInFrontOfBall",
		field: nameof<IndividualGamePlayerStats>("TimeInFrontOfBall"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentInFrontOfBall",
		field: nameof<IndividualGamePlayerStats>("PercentInFrontOfBall"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeDefensiveHalf",
		field: nameof<IndividualGamePlayerStats>("TimeDefensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentDefensiveHalf",
		field: nameof<IndividualGamePlayerStats>("PercentDefensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeOffensiveHalf",
		field: nameof<IndividualGamePlayerStats>("TimeOffensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentOffensiveHalf",
		field: nameof<IndividualGamePlayerStats>("PercentOffensiveHalf"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeDefensiveThird",
		field: nameof<IndividualGamePlayerStats>("TimeDefensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentageDefensiveThird",
		field: nameof<IndividualGamePlayerStats>("PercentageDefensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeNeutralThird",
		field: nameof<IndividualGamePlayerStats>("TimeNeutralThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentNeutralThird",
		field: nameof<IndividualGamePlayerStats>("PercentNeutralThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "TimeOffensiveThird",
		field: nameof<IndividualGamePlayerStats>("TimeOffensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "PercentOffensiveThird",
		field: nameof<IndividualGamePlayerStats>("PercentOffensiveThird"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AverageDistanceToBall",
		field: nameof<IndividualGamePlayerStats>("AverageDistanceToBall"),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AverageDistanceToBallHasPossession",
		field: nameof<IndividualGamePlayerStats>(
			"AverageDistanceToBallHasPossession"
		),
		valueFormatter: NumberValueFormatter,
	},
	{
		headerName: "AverageDistanceToBallNoPossession",
		field: nameof<IndividualGamePlayerStats>(
			"AverageDistanceToBallNoPossession"
		),
		valueFormatter: NumberValueFormatter,
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
