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
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using static RSCWebApi.EntityFrameworkDatabaseContext;

namespace RSCWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayerStatsController : ControllerBase
    {

        private readonly ILogger<BallChasingApiController> _logger;
        private readonly IConfiguration _configuration;
        //private readonly EntityFrameworkDatabaseContext _context;

        //public BallChasingApiController(IConfiguration configuration, ILogger<BallChasingApiController> logger, IServiceProvider serviceProvider)
        public PlayerStatsController(IConfiguration configuration, ILogger<BallChasingApiController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            //_context = HttpContext.RequestServices.GetService(typeof(DatabaseContext)) as DatabaseContext;
            //_context = context;
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

        //[HttpPost]
        //[Route("InsertWeeklyStat")]
        //public IndividualGamePlayerStatsDB InsertWeeklyStat(IndividualGamePlayerStatsDB model)
        //{
        //    using (var db = new EntityFrameworkDatabaseContext(_configuration))
        //    {
        //        var entity = db.IndividualGamePlayerStatsDB.Add(model).Entity;
        //        db.SaveChanges();
        //        return entity;
        //    }
        //}

        //[HttpPost]
        //[Route("InsertWeeklyStats")]
        //public void InsertWeeklyStats(List<IndividualGamePlayerStatsDB> models)
        //{
        //    using (var db = new EntityFrameworkDatabaseContext(_configuration))
        //    {
        //        var matchingPlayers = db.IndividualGamePlayerStatsDB.Where(x => models.Select(y => y.RSCId + y.ReplayId).Contains(x.RSCId + x.ReplayId));

        //        var entriesNotYetInDb = models.Where(x => !matchingPlayers.Any(y => y.ReplayId == x.ReplayId && y.RSCId == x.RSCId));

        //        db.IndividualGamePlayerStatsDB.AddRange(entriesNotYetInDb);
        //        db.SaveChanges();
                
        //        return;
        //    }
        //}
    }
}
