using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using RestSharp;
using RestSharp.Authenticators;
using RestSharp.Serialization.Json;
using RSCWebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using static RSCWebApi.EntityFrameworkDatabaseContext;

namespace RSCWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoogleSheetsController : ControllerBase
    {

        private readonly ILogger<BallChasingApiController> _logger;
        private readonly IConfiguration _configuration;
        private readonly SheetsService _sheetsService;
        private string[] _scopes = { SheetsService.Scope.Spreadsheets }; // Change this if you're accessing Drive or Docs
        private string _applicationName = "RSCDev";
        private string _playerTrackerLinksSheetId = "1HLd_2yMGh_lX3adMLxQglWPIfRuiSiv587ABYnQX-0s";
		private string _playerContractsSheetId = "1WOQz4JWI3N2fhqAkwmmRKBm52_iKc7nax-Ad4nPwrvA";

		//public BallChasingApiController(IConfiguration configuration, ILogger<BallChasingApiController> logger, IServiceProvider serviceProvider)
		public GoogleSheetsController(IConfiguration configuration, ILogger<BallChasingApiController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            //_context = HttpContext.RequestServices.GetService(typeof(DatabaseContext)) as DatabaseContext;
            //_context = context;
            GoogleCredential credential;

            var credentialPath = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "rsc-dev-314103-7846f30ab584.json");

            // Put your credentials json file in the root of the solution and make sure copy to output dir property is set to always copy 
            using (var stream = new FileStream(credentialPath,
                FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(_scopes);
            }
            _sheetsService = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = _applicationName
            });
        }

        [HttpGet]
        [Route("GetAllPlayers")]
        public List<PlayerDetails> GetAllIndividualGameStats()
        {
            var toReturn = new List<PlayerDetails>();

            var request = _sheetsService.Spreadsheets.Values.Get(_playerTrackerLinksSheetId, "Link List");
            var response = request.Execute().Values.ToList();

			var request2 = _sheetsService.Spreadsheets.Values.Get(_playerContractsSheetId, "Master Contracts");
			var response2 = request2.Execute().Values.Where(x => x[0].ToString() == "TRUE").ToList();

			response.ForEach(element =>
            {
				var rscId = element[0].ToString();

				var existingPlayer = toReturn.Find(x => x.RSCId == rscId);

                var trackerLink = element[2].ToString();

				var trackerPlatform = "";
				var trackerId = "";

				if (trackerLink.StartsWith("http://"))
				{
					trackerLink = trackerLink.Replace("http://", "https://"); //just make them all https since it doesn't really matter
				}

				//some of the links include "rocket-league"
				if (trackerLink.Contains("/rocket-league/"))
				{
					trackerLink = trackerLink.Replace("/rocket-league", "");
				}

				if (trackerLink.Contains("/xbl/"))
				{
					trackerLink = trackerLink.Replace("/xbl", "/xbox"); //not sure if there's a difference here?
				}

				if (trackerLink.Contains("/ps/"))
				{
					trackerLink = trackerLink.Replace("/ps/", "/psn/"); //not sure if there's a difference here?
				}

				if (trackerLink.Contains("steam"))
				{
					//steam
					trackerPlatform = "Steam";
					trackerId = Regex.Split(trackerLink, "https://rocketleague.tracker.network/profile/steam/", RegexOptions.IgnoreCase)[1];
				}
				else if (trackerLink.Contains("epic"))
				{
					//epic
					trackerPlatform = "Epic";
					//uri is in ASCII so we need to decode it
					trackerId = Uri.UnescapeDataString(trackerLink).Split("https://rocketleague.tracker.network/profile/epic/")[1];
				}
				else if (trackerLink.Contains("xbox"))
				{
					//xbox
					trackerPlatform = "Xbox";
					trackerId = Uri.UnescapeDataString(trackerLink).Split("https://rocketleague.tracker.network/profile/xbox/")[1];
				}
				else if (trackerLink.Contains("switch"))
				{
					//xbox
					trackerPlatform = "Switch";
					trackerId = trackerLink.Split("https://rocketleague.tracker.network/profile/switch/")[1];
				}
				else
				{
					//playstation
					trackerPlatform = "PS4";
					trackerId = Regex.Split(trackerLink, "https://rocketleague.tracker.network/profile/psn/", RegexOptions.IgnoreCase)[1];
				}

				//if the tracker id still contains /overview at the end, remove it
				if (trackerId.Contains("/"))
				{
					trackerId = trackerId.Split("/")[0];
				}

				if(existingPlayer != null)
                {
					existingPlayer.PlayerTrackerLinks.Add(new PlayerTrackerLink(element[2].ToString(), trackerPlatform, trackerId));
				}
                else
                {
					var tracker = new PlayerDetails();

					tracker.RSCId = element[0].ToString();
					tracker.Name = element[1].ToString();
					tracker.PlayerTrackerLinks = new List<PlayerTrackerLink>() { new PlayerTrackerLink(element[2].ToString(), trackerPlatform, trackerId) };

					var playerContract = response2.Find(x => x[1].ToString() == tracker.RSCId);
                    if (playerContract != null)
                    {
						tracker.Franchise = playerContract[3].ToString();
						tracker.Team = playerContract[4].ToString();
						try
						{
							tracker.BaseMmr = Convert.ToInt32(playerContract[5]);
						}
						catch (Exception e)
						{
							//do nothing
						}
						try
						{
							tracker.CurrentMmr = Convert.ToInt32(playerContract[6]);
						}
						catch (Exception e)
						{
							//do nothing
						}
						tracker.ContractStatus = playerContract[7].ToString();
						if(playerContract.Count > 8)
						{
                            try
							{
								tracker.ContractLength = Convert.ToInt32(playerContract[8]);
							} catch(Exception e)
                            {
								//do nothing
                            }
						}

						toReturn.Add(tracker);

					}

					//toReturn.Add(tracker);
				}
            });
            return toReturn;
        }

		[HttpGet]
		[Route("GetAllTeams")]
		public List<LeagueTeam> GetAllTeams()
		{
			var toReturn = new List<LeagueTeam>();

			var request = _sheetsService.Spreadsheets.Values.Get(_playerContractsSheetId, "Teams");
			var response = request.Execute().Values.ToList();

			response.ForEach(element =>
			{
				toReturn.Add(new LeagueTeam(element[0].ToString(), element[1].ToString(), element[2].ToString()));
			});
			return toReturn;
		}
	}
}
