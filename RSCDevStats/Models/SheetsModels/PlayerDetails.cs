using System;
using System.Collections.Generic;

namespace RSCWebApi
{
    public class PlayerDetails
    {
        public string RSCId { get; set; }
        public string Name { get; set; }
        public List<PlayerTrackerLink> PlayerTrackerLinks { get; set; }
        public string Franchise { get; set; }
        public string Team { get; set; }
        public int BaseMmr { get; set; }
        public int CurrentMmr { get; set; }
        public string ContractStatus { get; set; }
        public int ContractLength { get; set; }
    }

    public class PlayerTrackerLink
    {
        public PlayerTrackerLink(string trackerLink, string platform, string platformId)
        {
            TrackerLink = trackerLink;
            Platform = platform;
            PlatformId = platformId;
        }
        public string TrackerLink { get; set; }
        public string Platform { get; set; }
        public string PlatformId { get; set; }
    }
}
