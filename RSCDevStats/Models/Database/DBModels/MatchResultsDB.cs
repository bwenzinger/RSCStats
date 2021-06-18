using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RSCWebApi
{
    [Table("match_results")]
    public class MatchResultsDB
    {
        public string Tier { get; set; }
        public int Week { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public int HomeTeamWins { get; set; }
		public int AwayTeamWins { get; set; }
	}
}
