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
#if DEBUG
    [EnableCors(origins: "*", headers: "*", methods: "*")]
#endif
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
        public async Task<Event[]> GetAll() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int id;
            try {
                id = obj.userId;
            } catch (Exception ex) {
                Debug.WriteLine("[EventController::GetAll] invalid request payload: "
                    + ex.Message);
                throw ex;
            }

            var connString = ConfigurationManager.ConnectionStrings[profile].ConnectionString;

            try {
                using (var conn = new SqlConnection(connString)) {
                    conn.Open();
                    var query = "select title, description, startTime, endTime "
                        + "from student, event "
                        + "where student.id = event.studentId and "
                        + "student.id = @id";

                    using (var cmd = new SqlCommand(query, conn)) {
                        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                        using (var reader = cmd.ExecuteReader()) {
                            var events = new List<Event>();
                            while (reader.Read()) {
                                var title = reader.GetString(0);
                                var description = reader.GetString(1);
                                var startTime = reader.GetDateTime(2);
                                var endTime = reader.GetDateTime(3);
                                events.Add(new Event {
                                    Title = title,
                                    Description = description,
                                    StartTime = startTime,
                                    EndTime = endTime,
                                });
                            }
                            log.Info("[EventController::GetAll] returning info for student "
                                + id.ToString() + ": " + events.ToString());
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
