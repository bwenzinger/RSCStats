using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSCDevStats.Constants
{
    public static class GlobalConstants
    {
        public static List<string> Leagues = new List<string>() { "Premier", "Master", "Elite", "Major", "Minor", "Challenger", "Prospect", "Contender", "Amateur" };

        public static Dictionary<string, string> LeaguesAndBallchasingSheetIds = new Dictionary<string, string>()
            {
                //{ "Premier", "asdf" },
                //{ "Master","asdf" },
                //{ "Elite","asdf" },
                { "Major","1Yc-cu_UL2YF_KhjGkzcVSrmKJJ65cL_D38Usuga-SZY" },
                //{ "Minor","asdf" },
                //{ "Challenger","asdf" },
                //{ "Prospect","asdf" },
                //{ "Contender","asdf" },
                //{ "Amateur", "asdf" },
            };
    }
}
