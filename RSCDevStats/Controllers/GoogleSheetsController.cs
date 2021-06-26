using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Drive.v3;
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
using Microsoft.EntityFrameworkCore;
using RSCDevStats.Helpers;

namespace RSCWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoogleSheetsController : ControllerBase
    {

        private readonly ILogger<BallChasingApiController> _logger;
        private readonly IConfiguration _configuration;
        private readonly SheetsService _sheetsService;
        private readonly DriveService _driveService;
        private string[] _sheetsScopes = { SheetsService.Scope.Spreadsheets }; // Change this if you're accessing Drive or Docs
        private string[] _driveScopes = { SheetsService.Scope.Drive }; // Change this if you're accessing Drive or Docs
        private string _applicationName = "RSCDev";
        private string _playerTrackerLinksSheetId = "1HLd_2yMGh_lX3adMLxQglWPIfRuiSiv587ABYnQX-0s";
		private string _playerContractsSheetId = "1WOQz4JWI3N2fhqAkwmmRKBm52_iKc7nax-Ad4nPwrvA";
		private List<string> _masterSheets = new List<string>()
            { 
                "12zVg7EjwolL9h1levFou_4leD8TLZ6m-_IvMIE2a3-I", //Amateur
                "1LIzxVc8E2r_KzB6h_Y3Xh-kDIJTPLfjH6XA8xHw5214", //Challenger 1
                "1BEr4qL5zE5z4VvXyFhK2jxL1hZAuQPRIDVXea2dKMk0", //Challenger 2
                "1nNGThNQSn2KM6QqAcRSsQCl1FTv3IUwezATIrop8OMU", //Contender 1
                "1C1UDtx2HjLicYcyu0NHpLqAuk0ygggTKgMXk2YybU3s", //Contender 2
                "1J0efIzEjef_nBcE-iua8_B6rIssaFKhkiVK-oZs_aGw", //Major 1
                "1eLnch-G7WRAh__FfLtmaWM7QqFS3iBSDBYkvgq5Jfok" //Major 2
            };

		//public BallChasingApiController(IConfiguration configuration, ILogger<BallChasingApiController> logger, IServiceProvider serviceProvider)
		public GoogleSheetsController(IConfiguration configuration, ILogger<BallChasingApiController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            //_context = HttpContext.RequestServices.GetService(typeof(DatabaseContext)) as DatabaseContext;
            //_context = context;
            GoogleCredential sheetsCredential;
            GoogleCredential driveCredential;

            var credentialPath = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "rsc-dev-314103-7846f30ab584.json");

            // Put your credentials json file in the root of the solution and make sure copy to output dir property is set to always copy 
            using (var stream = new FileStream(credentialPath,
                FileMode.Open, FileAccess.Read))
            {
                sheetsCredential = GoogleCredential.FromStream(stream).CreateScoped(_sheetsScopes);
            }
            using (var stream = new FileStream(credentialPath,
                FileMode.Open, FileAccess.Read))
            {
                driveCredential = GoogleCredential.FromStream(stream).CreateScoped(_driveScopes);
            }
            _driveService = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = driveCredential,
                ApplicationName = _applicationName
            });
            _sheetsService = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = sheetsCredential,
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

		[HttpPost]
		[Route("RefreshDatabaseFromSheets")]
		public void RefreshDatabaseFromSheets()
		{
            var driveRequest = _driveService.Files.List();
            //driveRequest.DriveId = "1e4Qr_gFyOarff2iROs9YpSsg9PSSAMup";
            //driveRequest.IncludeItemsFromAllDrives = true;
            //driveRequest.Corpora = "DriveId";
            driveRequest.Q = "'1e4Qr_gFyOarff2iROs9YpSsg9PSSAMup' in parents";
            //driveRequest.Fields = "files(id, name)";
            var driveResponse = driveRequest.Execute();

            List<IndividualGamePlayerStatsDB> individualGamesToAdd = new List<IndividualGamePlayerStatsDB>();

            var count = 0;

            //skip the "copy of amateur" file
            driveResponse.Files.Where(x => !x.Name.ToLower().Contains("copy")).ToList().ForEach(file =>

            //_masterSheets.ForEach(sheet =>
            {
				var request = _sheetsService.Spreadsheets.Values.Get(file.Id, "Raw Stats");
				var response = request.Execute().Values;

                //skip the column header row
                response.Skip(1).ToList().ForEach(playerGame =>
                {
                    if (playerGame.Count == 0 || playerGame[0].ToString() == "")
                    {
                        return;
                    }
                    var toAdd = new IndividualGamePlayerStatsDB();
					toAdd.RSCId = playerGame[0].ToString();
					toAdd.Name = playerGame[1].ToString();
					toAdd.Team = playerGame[2].ToString();
                    toAdd.Day = Utils.TryParseInt(playerGame[3]);
                    toAdd.GameNumber = Utils.TryParseInt(playerGame[4]);
					//division match is 5
					toAdd.GamesWon = playerGame[6].ToString() == "1" ? 1 : 0;
					toAdd.GamesLost = playerGame[7].ToString() == "1" ? 1 : 0;
                    toAdd.MVP = playerGame[8].ToString() == "1" ? true : false;
                    toAdd.Score = Utils.TryParseInt(playerGame[9]);
                    toAdd.Goals = Utils.TryParseInt(playerGame[10]);
                    toAdd.Assists = Utils.TryParseInt(playerGame[11]);
                    toAdd.Saves = Utils.TryParseInt(playerGame[12]);
                    toAdd.Shots = Utils.TryParseInt(playerGame[13]);
                    toAdd.Cycle = Utils.TryParseInt(playerGame[14]);
                    toAdd.HatTrick = Utils.TryParseInt(playerGame[15]);
                    toAdd.Playmaker = Utils.TryParseInt(playerGame[16]);
                    toAdd.Savior = Utils.TryParseInt(playerGame[17]);
                    toAdd.PointsAgainst = Utils.TryParseInt(playerGame[18]);
                    toAdd.GoalsAgainst = Utils.TryParseInt(playerGame[19]);
                    toAdd.AssistAgainst = Utils.TryParseInt(playerGame[20]);
                    toAdd.SavesAgainst = Utils.TryParseInt(playerGame[21]);
                    toAdd.ShotsAgainst = Utils.TryParseInt(playerGame[22]);
                    toAdd.OpponentTeam = playerGame[23].ToString();
                    toAdd.Tier = playerGame[24].ToString();
                    //25 is "FF games"
                    toAdd.bpm = Utils.TryParseDouble(playerGame[26]);
                    toAdd.AvgBoostAmount = Utils.TryParseDouble(playerGame[27]);
                    toAdd.BoostCollected = Utils.TryParseInt(playerGame[28]);
                    toAdd.BoostCollectedBigPads = Utils.TryParseInt(playerGame[29]);
                    toAdd.BoostCollectedSmallPads = Utils.TryParseInt(playerGame[30]);
                    toAdd.CountCollectedBigPads = Utils.TryParseInt(playerGame[31]);
                    toAdd.CountCollectedSmallPads = Utils.TryParseInt(playerGame[32]);
                    toAdd.BoostStolen = Utils.TryParseInt(playerGame[33]);
                    toAdd.BoostStolenBigPads = Utils.TryParseInt(playerGame[34]);
                    toAdd.BoostStolenSmallPads = Utils.TryParseInt(playerGame[35]);
                    toAdd.CountStolenBigPads = Utils.TryParseInt(playerGame[36]);
                    toAdd.CountStolenSmallpads = Utils.TryParseInt(playerGame[37]);
                    toAdd.ZeroBoostTime = Utils.TryParseDouble(playerGame[38]);
                    toAdd.HundredBoostTime = Utils.TryParseDouble(playerGame[39]);
                    toAdd.BoostUsedWhileSupersonic = Utils.TryParseInt(playerGame[40]);
                    toAdd.BoostOverfillTotal = Utils.TryParseInt(playerGame[41]);
                    toAdd.BoostOverfillStolen = Utils.TryParseInt(playerGame[42]);
                    toAdd.AverageSpeed = Utils.TryParseDouble(playerGame[43]);
                    toAdd.TotalDistance = Utils.TryParseDouble(playerGame[44]);
                    toAdd.TimeSlowSpeed = Utils.TryParseDouble(playerGame[45]);
                    toAdd.PercentSlowSpeed = Utils.TryParseDouble(playerGame[46]);
                    toAdd.TimeBoostSpeed = Utils.TryParseDouble(playerGame[47]);
                    toAdd.PercentBoostSpeed = Utils.TryParseDouble(playerGame[48]);
                    toAdd.TimeSupersonic = Utils.TryParseDouble(playerGame[49]);
                    toAdd.PercentSupersonic = Utils.TryParseDouble(playerGame[50]);
                    toAdd.TimeOnGround = Utils.TryParseDouble(playerGame[51]);
                    toAdd.PercentOnGround = Utils.TryParseDouble(playerGame[52]);
                    toAdd.TimeLowAir = Utils.TryParseDouble(playerGame[53]);
                    toAdd.PercentLowAir = Utils.TryParseDouble(playerGame[54]);
                    toAdd.TimeHighAir = Utils.TryParseDouble(playerGame[55]);
                    toAdd.PercentHighAir = Utils.TryParseDouble(playerGame[56]);
                    toAdd.TimePowerslide = Utils.TryParseDouble(playerGame[57]);
                    toAdd.AveragePowerslideTime = Utils.TryParseDouble(playerGame[58]);
                    toAdd.CountPowerslide = Utils.TryParseInt(playerGame[59]);
                    toAdd.TimeMostBack = Utils.TryParseDouble(playerGame[60]);
                    toAdd.PercentMostBack = Utils.TryParseDouble(playerGame[61]);
                    toAdd.TimeMostForward = Utils.TryParseDouble(playerGame[62]);
                    toAdd.PercentMostForward = Utils.TryParseDouble(playerGame[63]);
                    toAdd.TimeInFrontOfBall = Utils.TryParseDouble(playerGame[64]);
                    toAdd.PercentInFrontOfBall = Utils.TryParseDouble(playerGame[65]);
                    toAdd.TimeBehindBall = Utils.TryParseDouble(playerGame[66]);
                    toAdd.PercentBehindBall = Utils.TryParseDouble(playerGame[67]);
                    //68 duplicate TimeInFrontOfBall
                    //69 duplicate PercentInFrontOfBall
                    toAdd.TimeDefensiveHalf = Utils.TryParseDouble(playerGame[70]);
                    toAdd.PercentDefensiveHalf = Utils.TryParseDouble(playerGame[71]);
                    toAdd.TimeOffensiveHalf = Utils.TryParseDouble(playerGame[72]);
                    toAdd.PercentOffensiveHalf = Utils.TryParseDouble(playerGame[73]);
                    toAdd.TimeDefensiveThird = Utils.TryParseDouble(playerGame[74]);
                    toAdd.PercentageDefensiveThird = Utils.TryParseDouble(playerGame[75]);
                    toAdd.TimeNeutralThird = Utils.TryParseDouble(playerGame[76]);
                    toAdd.PercentNeutralThird = Utils.TryParseDouble(playerGame[77]);
                    toAdd.TimeOffensiveThird = Utils.TryParseDouble(playerGame[78]);
                    toAdd.PercentOffensiveThird = Utils.TryParseDouble(playerGame[79]);
                    toAdd.AverageDistanceToBall = Utils.TryParseDouble(playerGame[80]);
                    toAdd.AverageDistanceToBallHasPossession = Utils.TryParseDouble(playerGame[81]);
                    toAdd.AverageDistanceToBallNoPossession = Utils.TryParseDouble(playerGame[82]);
                    toAdd.DemosInflicted = Utils.TryParseInt(playerGame[83]);
                    toAdd.DemosTaken = Utils.TryParseInt(playerGame[84]);
                    toAdd.LossMVP = Utils.TryParseInt(playerGame[85]) == 1 ? true : false;

                    individualGamesToAdd.Add(toAdd);

				});

                //Console.Write("count: " + count);
                System.Diagnostics.Debug.WriteLine("count: " + count++);

                //new PlayerStatsController(_configuration, _logger).InsertWeeklyStats(individualGamesToAdd);
            });

            using (var db = new EntityFrameworkDatabaseContext(_configuration))
            {
                //var matchingPlayers = db.IndividualGamePlayerStatsDB.Where(x => models.Select(y => y.RSCId + y.ReplayId).Contains(x.RSCId + x.ReplayId));

                //var entriesNotYetInDb = models.Where(x => !matchingPlayers.Any(y => y.ReplayId == x.ReplayId && y.RSCId == x.RSCId));
                //db.IndividualGamePlayerStatsDB.FromSqlRaw("TRUNCATE TABLE rscstats.weekly_player_stats");
                db.Database.ExecuteSqlRaw("TRUNCATE TABLE rscstats.weekly_player_stats");
                //db.SaveChanges();

                db.IndividualGamePlayerStatsDB.AddRange(individualGamesToAdd);
                db.SaveChanges();
            }
            return;
		}
	}
}
