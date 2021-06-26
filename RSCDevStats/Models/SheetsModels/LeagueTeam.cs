using System;
using System.Collections.Generic;

namespace RSCWebApi
{
    public class LeagueTeam
    {
        public LeagueTeam(string teamName, string franchise, string tier)
        {
            TeamName = teamName;
            Franchise = franchise;
            Tier = tier;
        }
        public string TeamName { get; set; }
        public string Franchise { get; set; }
        public string Tier { get; set; }
    }
}
