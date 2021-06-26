export interface PlayerDetails {
	RSCId: string
	Name: string
	PlayerTrackerLinks: PlayerTrackerLink[]
	Franchise: string
	Team: string
	BaseMmr: number
	CurrentMmr: number
	ContractStatus: string
	ContractLength: string
}

export interface PlayerTrackerLink {
	TrackerLink: string
	Platform: string
	PlatformId: string
}
