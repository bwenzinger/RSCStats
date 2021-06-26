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
            //Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            request.AddParameter("creator", creator);

            var response = ballChasingClient.restClient.Get<BallChasingGroupRoot>(request);

            if (response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                Console.WriteLine("Too many ballchasing requests (429), GetGroupsByCreator, creator: " + creator);
            }

            return response.Data.list;
        }

        [HttpGet]
        [Route("GetGroupsByParentGroup/{groupId}")]
        public List<BallChasingGroup> GetGroupsByParentGroup(string groupId)
        {
            //Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            
            //request.AddHeader("Authorization", "bF2DbFsOycipB4EmRTFoIp1SgXnMYqV8qS9275DY");
            request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingGroupRoot>(request);

            if (response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                Console.WriteLine("Too many ballchasing requests (429), GetGroupsByParentGroup, groupId: " + groupId);
            }

            return response.Data.list;
        }

        [HttpGet]
        [Route("GetGroupById/{groupId}")]
        public BallChasingGroupStats GetGroupById(string groupId)
        {
            //Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups/" + groupId, DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            //request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingGroupStats>(request);

            if (response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                Console.WriteLine("Too many ballchasing requests (429), GetGroupById, groupId: " + groupId);
            }

            return response.Data;
        }

        [HttpGet]
        [Route("GetReplaysByGroup/{groupId}")]
        public BallChasingReplayListRoot GetReplaysByGroup(string groupId)
        {
            //Console.WriteLine(DateTime.Now.ToString());
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("replays", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingReplayListRoot>(request);

            if(response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                Console.WriteLine("Too many ballchasing requests (429), GetReplaysByGroup, groupId: " + groupId);
            }

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

            if (response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                Console.WriteLine("Too many ballchasing requests (429), GetReplayById, replayId: " + replayId);
            }

            return response.Data;
        }
    }
}
