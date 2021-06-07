using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RSCWebApi
{
    public class EntityFrameworkDatabaseContext : DbContext
    {
        public DbSet<IndividualGamePlayerStatsDB> IndividualGamePlayerStatsDB { get; set; }
        private IConfiguration _configuration;

        public EntityFrameworkDatabaseContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var serverVersion = ServerVersion.AutoDetect(_configuration.GetConnectionString("DefaultConnection"));
            optionsBuilder.UseMySql(_configuration.GetConnectionString("DefaultConnection"), serverVersion);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IndividualGamePlayerStatsDB>()
                .HasKey(c => new { c.RSCId, c.ReplayId });
        }

        //[Table("weekly_player_stats")]
        //public class WeeklyPlayerStatDB
        //{
        //    [Key, Column("rsc_id")]
        //    public string RSCId { get; set; }

        //    public int week { get; set; }
        //    public string name { get; set; }
        //    public int games_won { get; set; }
        //}
        //[Table("individual_game_player_stats")]
        //public class IndividualGamePlayerStatsDB
        //{
        //    [Key, Column("rsc_id")]
        //    public string RSCId { get; set; }

        //    public int week { get; set; }
        //    public string name { get; set; }
        //    public int games_won { get; set; }
        //    public int games_lost { get; set; }
        //}
    }
}
