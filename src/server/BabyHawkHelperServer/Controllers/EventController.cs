using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;

using BabyHawkHelperServer.Models;

namespace BabyHawkHelperServer.Controllers
{
    public class EventController: ApiController {
        private static readonly string profile =
#if DEBUG
            "dev"
#else
            "prod"
#endif
        ;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(
            System.Reflection.MethodBase.GetCurrentMethod().DeclaringType
        );

        [HttpPost]
        public async void Insert() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int studentId;
            string title;
            string description;
            DateTime startTime;
            DateTime endTime;
            try {
                studentId = obj.userId;
                title = obj.title;
                description = obj.desc;
                startTime = obj.start;
                endTime = obj.end;
            } catch (Exception ex) {
                Debug.WriteLine("[EventController::Insert] invalid request payload: "
                    + ex.Message);
                throw ex;
            }

            var connString = ConfigurationManager.ConnectionStrings[profile].ConnectionString;

            try {
                using (var conn = new SqlConnection(connString)) {
                    conn.Open();
                    var query = "insert into event "
                        + "(studentId, title, description, startTime, endTime) "
                        + "values (@studentId, @title, @description, @startTime, @endTime)";

                    using (var cmd = new SqlCommand(query, conn)) {
                        cmd.Parameters.Add("@studentId", SqlDbType.Int).Value = studentId;
                        cmd.Parameters.Add("@title", SqlDbType.VarChar).Value = title;
                        cmd.Parameters.Add("@description", SqlDbType.VarChar).Value = description;
                        cmd.Parameters.Add("@startTime", SqlDbType.DateTime).Value = startTime;
                        cmd.Parameters.Add("@endTime", SqlDbType.DateTime).Value = endTime;

                        cmd.ExecuteNonQuery();
                    }
                }
            } catch (Exception ex) {
                Debug.WriteLine("[EventController::Insert] failed to access database: "
                    + ex.Message);
                Debug.WriteLine(ex.StackTrace);
                throw ex;
            }
        }

        [HttpPost]
        public async Task<Event[]> GetAll() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int studentId;
            try {
                studentId = obj.userId;
            } catch (Exception ex) {
                Debug.WriteLine("[EventController::GetAll] invalid request payload: "
                    + ex.Message);
                throw ex;
            }

            var connString = ConfigurationManager.ConnectionStrings[profile].ConnectionString;

            try {
                using (var conn = new SqlConnection(connString)) {
                    conn.Open();
                    var query = "select event.id, title, description, startTime, endTime "
                        + "from student, event "
                        + "where student.id = event.studentId and "
                        + "student.id = @studentId";

                    using (var cmd = new SqlCommand(query, conn)) {
                        cmd.Parameters.Add("@studentId", SqlDbType.Int).Value = studentId;
                        using (var reader = cmd.ExecuteReader()) {
                            var events = new List<Event>();
                            while (reader.Read()) {
                                var id = reader.GetInt32(0);
                                var title = reader.GetString(1);
                                var description = reader.GetString(2);
                                var startTime = reader.GetDateTime(3);
                                var endTime = reader.GetDateTime(4);
                                events.Add(new Event {
                                    Id = id,
                                    Title = title,
                                    Description = description,
                                    StartTime = startTime,
                                    EndTime = endTime,
                                });
                            }
                            log.Info("[EventController::GetAll] returning info for student "
                                + studentId.ToString() + ": " + events.ToString());
                            return events.ToArray();
                        }
                    }
                }
            } catch (Exception ex) {
                Debug.WriteLine("[EventController::GetAll] failed to access database: "
                    + ex.Message);
                Debug.WriteLine(ex.StackTrace);
                throw ex;
            }
        }
    }
}
