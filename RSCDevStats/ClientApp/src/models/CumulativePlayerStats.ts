export interface CumulativePlayerStats {
	Name: string
	RSCId: string
	Tier: string
	Team: string
	GamesPlayed?: number | undefined
	WinPercent?: number | undefined
	GamesWon?: number | undefined
	GamesLost?: number | undefined
	MVPs?: number | undefined
	Score?: number | undefined
	Goals?: number | undefined
	Assists?: number | undefined
	Saves?: number | undefined
	Shots?: number | undefined
	Cycle?: number | undefined
	HatTrick?: number | undefined
	Playmaker?: number | undefined
	Savior?: number | undefined
	PointsAgainst?: number | undefined
	GoalsAgainst?: number | undefined
	AssistAgainst?: number | undefined
	SavesAgainst?: number | undefined
	ShotsAgainst?: number | undefined
	Bpm?: number | undefined
	AvgBoostAmount?: number | undefined
	BoostCollected?: number | undefined
	BoostCollectedBigPads?: number | undefined
	BoostCollectedSmallPads?: number | undefined
	CountCollectedBigPads?: number | undefined
	CountCollectedSmallPads?: number | undefined
	BoostStolen?: number | undefined
	BoostStolenBigPads?: number | undefined
	BoostStolenSmallPads?: number | undefined
	CountStolenBigPads?: number | undefined
	CountStolenSmallpads?: number | undefined
	ZeroBoostTime?: number | undefined
	HundredBoostTime?: number | undefined
	BoostUsedWhileSupersonic?: number | undefined
	BoostOverfillTotal?: number | undefined
	BoostOverfillStolen?: number | undefined
	AverageSpeed?: number | undefined
	TotalDistance?: number | undefined
	TimeSlowSpeed?: number | undefined
	PercentSlowSpeed?: number | undefined
	TimeBoostSpeed?: number | undefined
	PercentBoostSpeed?: number | undefined
	TimeSupersonic?: number | undefined
	PercentSupersonic?: number | undefined
	TimeOnGround?: number | undefined
	PercentOnGround?: number | undefined
	TimeLowAir?: number | undefined
	PercentLowAir?: number | undefined
	TimeHighAir?: number | undefined
	PercentHighAir?: number | undefined
	TimePowerslide?: number | undefined
	AveragePowerslideTime?: number | undefined
	CountPowerslide?: number | undefined
	TimeMostBack?: number | undefined
	PercentMostBack?: number | undefined
	TimeMostForward?: number | undefined
	PercentMostForward?: number | undefined
	TimeInFrontOfBall?: number | undefined
	PercentInFrontOfBall?: number | undefined
	TimeDefensiveHalf?: number | undefined
	PercentDefensiveHalf?: number | undefined
	TimeOffensiveHalf?: number | undefined
	PercentOffensiveHalf?: number | undefined
	TimeDefensiveThird?: number | undefined
	PercentageDefensiveThird?: number | undefined
	TimeNeutralThird?: number | undefined
	PercentNeutralThird?: number | undefined
	TimeOffensiveThird?: number | undefined
	PercentOffensiveThird?: number | undefined
	AverageDistanceToBall?: number | undefined
	AverageDistanceToBallHasPossession?: number | undefined
	AverageDistanceToBallNoPossession?: number | undefined
	DemosInflicted?: number | undefined
	DemosTaken?: number | undefined
	LossMVP?: number | undefined
}

export interface IndividualGamePlayerStats {
	Name: string
	RSCId: string
	OnlineId: string
	Map?: string
	Date?: string
	ReplayId: string
	ReplayTitle: string
	GameNumber: number
	Tier: string
	Team: string
	OpponentTeam: string
	GamesWon?: number | undefined
	GamesLost?: number | undefined
	CarId?: number
	CarName?: string
	Score?: number | undefined
	Goals?: number | undefined
	Assists?: number | undefined
	Saves?: number | undefined
	Shots?: number | undefined
	MVP?: boolean
	Cycle?: number | undefined
	HatTrick?: number | undefined
	Playmaker?: number | undefined
	Savior?: number | undefined
	PointsAgainst?: number | undefined
	GoalsAgainst?: number | undefined
	GoalsAgainstLastDefender?: number | undefined
	ShootingPercent?: number | undefined
	AssistAgainst?: number | undefined
	SavesAgainst?: number | undefined
	ShotsAgainst?: number | undefined
	Bpm?: number | undefined
	AvgBoostAmount?: number | undefined
	BoostCollected?: number | undefined
	BoostCollectedBigPads?: number | undefined
	BoostCollectedSmallPads?: number | undefined
	CountCollectedBigPads?: number | undefined
	CountCollectedSmallPads?: number | undefined
	BoostStolen?: number | undefined
	BoostStolenBigPads?: number | undefined
	BoostStolenSmallPads?: number | undefined
	CountStolenBigPads?: number | undefined
	CountStolenSmallpads?: number | undefined
	ZeroBoostTime?: number | undefined
	HundredBoostTime?: number | undefined
	BoostUsedWhileSupersonic?: number | undefined
	BoostOverfillTotal?: number | undefined
	BoostOverfillStolen?: number | undefined
	AverageSpeed?: number | undefined
	TotalDistance?: number | undefined
	TimeSlowSpeed?: number | undefined
	PercentSlowSpeed?: number | undefined
	TimeBoostSpeed?: number | undefined
	PercentBoostSpeed?: number | undefined
	TimeSupersonic?: number | undefined
	PercentSupersonic?: number | undefined
	TimeOnGround?: number | undefined
	PercentOnGround?: number | undefined
	TimeLowAir?: number | undefined
	PercentLowAir?: number | undefined
	TimeHighAir?: number | undefined
	PercentHighAir?: number | undefined
	TimePowerslide?: number | undefined
	AveragePowerslideTime?: number | undefined
	CountPowerslide?: number | undefined
	TimeMostBack?: number | undefined
	PercentMostBack?: number | undefined
	TimeMostForward?: number | undefined
	PercentMostForward?: number | undefined
	TimeInFrontOfBall?: number | undefined
	PercentInFrontOfBall?: number | undefined
	TimeBehindBall?: number | undefined
	PercentBehindBall?: number | undefined
	TimeDefensiveHalf?: number | undefined
	PercentDefensiveHalf?: number | undefined
	TimeOffensiveHalf?: number | undefined
	PercentOffensiveHalf?: number | undefined
	TimeDefensiveThird?: number | undefined
	PercentageDefensiveThird?: number | undefined
	TimeNeutralThird?: number | undefined
	PercentNeutralThird?: number | undefined
	TimeOffensiveThird?: number | undefined
	PercentOffensiveThird?: number | undefined
	AverageDistanceToBall?: number | undefined
	AverageDistanceToBallHasPossession?: number | undefined
	AverageDistanceToBallNoPossession?: number | undefined
	DemosInflicted?: number | undefined
	DemosTaken?: number | undefined
	LossMVP?: boolean | undefined
	Day?: number
	Dummy1?: string | undefined
	Dummy2?: string | undefined
}
