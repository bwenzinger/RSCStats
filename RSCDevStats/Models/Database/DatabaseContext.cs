//using MySql.Data.MySqlClient;
//using System;
//using System.Collections.Generic;

//namespace RSCWebApi
//{
//    public class DatabaseContext
//    {
//        public string ConnectionString { get; set; }

//        public DatabaseContext(string connectionString)
//        {
//            this.ConnectionString = connectionString;
//        }

//        private MySqlConnection GetConnection()
//        {
//            return new MySqlConnection(ConnectionString);
//        }

//        public List<WeeklyPlayerStatDB> GetAllWeeklyStats()
//        {
//            List<WeeklyPlayerStatDB> list = new List<WeeklyPlayerStatDB>();

//            using (MySqlConnection conn = GetConnection())
//            {
//                conn.Open();
//                MySqlCommand cmd = new MySqlCommand("select * from rscstats.weekly_player_stats", conn);

//                using (var reader = cmd.ExecuteReader())
//                {
//                    while (reader.Read())
//                    {
//                        list.Add(new WeeklyPlayerStatDB()
//                        {
//                            rsc_id = reader["rsc_id"].ToString(),
//                            week = Convert.ToInt32(reader["week"]),
//                            name = reader["name"].ToString(),
//                            games_won = Convert.ToInt32(reader["games_won"])
//                        });
//                    }
//                }
//            }
//            return list;
//        }

//        //public bool InsertWeeklyStats(List<WeeklyPlayerStatDB> stats)
//        //{
//        //    List<WeeklyPlayerStatDB> list = new List<WeeklyPlayerStatDB>();

//        //    using (MySqlConnection conn = GetConnection())
//        //    {
//        //        conn.Open();
//        //        MySqlCommand cmd = new MySqlCommand("select * from rscstats.weekly_player_stats", conn);

//        //        using (var reader = cmd.ExecuteReader())
//        //        {
//        //            while (reader.Read())
//        //            {
//        //                list.Add(new WeeklyPlayerStatDB()
//        //                {
//        //                    rsc_id = reader["rsc_id"].ToString(),
//        //                    week = Convert.ToInt32(reader["week"]),
//        //                    name = reader["name"].ToString(),
//        //                    games_won = Convert.ToInt32(reader["games_won"])
//        //                });
//        //            }
//        //        }
//        //    }
//        //    return list;
//        //}
//    }
//}
