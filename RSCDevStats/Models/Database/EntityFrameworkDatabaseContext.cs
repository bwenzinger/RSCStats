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
        public DbSet<MatchResultsDB> MatchResultsDB { get; set; }
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
            //modelBuilder.Entity<IndividualGamePlayerStatsDB>()
            //    .HasKey(c => new { c.RSCId, c.ReplayId });
            //modelBuilder.Entity<IndividualGamePlayerStatsDB>().HasNoKey();

            modelBuilder.Entity<MatchResultsDB>()
                .HasKey(c => new { c.Tier, c.Week, c.HomeTeam, c.AwayTeam });
        }
    }
}
