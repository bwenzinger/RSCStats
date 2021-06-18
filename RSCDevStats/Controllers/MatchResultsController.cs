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
    public class MatchResultsController : ControllerBase
    {

        private readonly ILogger<BallChasingApiController> _logger;
        private readonly IConfiguration _configuration;
        //private readonly EntityFrameworkDatabaseContext _context;

        //public BallChasingApiController(IConfiguration configuration, ILogger<BallChasingApiController> logger, IServiceProvider serviceProvider)
        public MatchResultsController(IConfiguration configuration, ILogger<BallChasingApiController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            //_context = HttpContext.RequestServices.GetService(typeof(DatabaseContext)) as DatabaseContext;
            //_context = context;
        }

        [HttpGet]
        [Route("GetAllMatchResults")]
        public List<MatchResultsDB> GetAllMatchResults()
        {
            var toReturn = new List<MatchResultsDB>();
            using (var db = new EntityFrameworkDatabaseContext(_configuration))
            {
                toReturn = db.MatchResultsDB.ToList();
            }

            return toReturn;
        }

        [HttpPost]
        [Route("InsertMatchResults")]
        public void InsertMatchResults(List<MatchResultsDB> models)
        {
            using (var db = new EntityFrameworkDatabaseContext(_configuration))
            {
                var matchingResults = db.MatchResultsDB.Where(x => models.Select(y => y.Tier + y.Week.ToString() + y.HomeTeam + y.AwayTeam).Contains(x.Tier + x.Week.ToString() + x.HomeTeam + x.AwayTeam));

                var entriesNotYetInDb = models.Where(x => !matchingResults.Any(y => y.Tier == x.Tier && y.Week == x.Week && y.HomeTeam == x.HomeTeam && y.AwayTeam == x.AwayTeam));

                db.MatchResultsDB.AddRange(entriesNotYetInDb);
                db.SaveChanges();

                return;
            }
        }
    }
}
