﻿using Microsoft.AspNetCore.Mvc;
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
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static RSCWebApi.EntityFrameworkDatabaseContext;

namespace RSCWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BallChasingApiController : ControllerBase
    {

        private readonly ILogger<BallChasingApiController> _logger;
        private readonly IConfiguration _configuration;
        //private readonly EntityFrameworkDatabaseContext _context;



        //public BallChasingApiController(IConfiguration configuration, ILogger<BallChasingApiController> logger, IServiceProvider serviceProvider)
        public BallChasingApiController(IConfiguration configuration, ILogger<BallChasingApiController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            //_context = HttpContext.RequestServices.GetService(typeof(DatabaseContext)) as DatabaseContext;
            //_context = context;
        }

        [HttpGet]
        [Route("GetGroupsByCreator/{creator}")]
        public List<BallChasingGroup> GetGroupsByCreator(string creator)
        {
            Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            request.AddParameter("creator", creator);

            var response = ballChasingClient.restClient.Get<BallChasingGroupRoot>(request).Data;

            return response.list;
        }

        [HttpGet]
        [Route("GetGroupsByParentGroup/{groupId}")]
        public List<BallChasingGroup> GetGroupsByParentGroup(string groupId)
        {
            Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            
            //request.AddHeader("Authorization", "bF2DbFsOycipB4EmRTFoIp1SgXnMYqV8qS9275DY");
            request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingGroupRoot>(request).Data;

            return response.list;
        }

        [HttpGet]
        [Route("GetGroupById/{groupId}")]
        public BallChasingGroupStats GetGroupById(string groupId)
        {
            Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups/" + groupId, DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            //request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingGroupStats>(request);

            return response.Data;
        }

        [HttpGet]
        [Route("GetReplaysByGroup/{groupId}")]
        public BallChasingReplayListRoot GetReplaysByGroup(string groupId)
        {
            Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("replays", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingReplayListRoot>(request);

            return response.Data;
        }

        [HttpGet]
        [Route("GetReplayById/{replayId}")]
        public BallChasingReplay GetReplayById(string replayId)
        {
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("replays/" + replayId, DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);

            var response = ballChasingClient.restClient.Get<BallChasingReplay>(request);
            //Console.WriteLine(DateTime.Now.ToString() + "Response code: " + response.StatusCode);

            return response.Data;
        }

        [HttpGet]
        [Route("GetAllWeeklyStats")]
        public List<IndividualGamePlayerStatsDB> GetAllIndividualGameStats()
        {
            var toReturn = new List<IndividualGamePlayerStatsDB>();
            using (var db = new EntityFrameworkDatabaseContext(_configuration))
            {
                toReturn = db.IndividualGamePlayerStatsDB.ToList();
            }

            return toReturn;
        }

        [HttpPost]
        [Route("InsertWeeklyStat")]
        public IndividualGamePlayerStatsDB InsertWeeklyStat(IndividualGamePlayerStatsDB model)
        {
            using (var db = new EntityFrameworkDatabaseContext(_configuration))
            {
                var entity = db.IndividualGamePlayerStatsDB.Add(model).Entity;
                db.SaveChanges();
                return entity;
            }
        }

        [HttpPost]
        [Route("InsertWeeklyStats")]
        public void InsertWeeklyStats(List<IndividualGamePlayerStatsDB> models)
        {
            using (var db = new EntityFrameworkDatabaseContext(_configuration))
            {
                var matchingPlayers = db.IndividualGamePlayerStatsDB.Where(x => models.Select(y => y.RSCId + y.ReplayId).Contains(x.RSCId + x.ReplayId));

                var entriesNotYetInDb = models.Where(x => !matchingPlayers.Any(y => y.ReplayId == x.ReplayId && y.RSCId == x.RSCId));

                db.IndividualGamePlayerStatsDB.AddRange(entriesNotYetInDb);
                db.SaveChanges();
                
                return;
            }
        }
    }
}