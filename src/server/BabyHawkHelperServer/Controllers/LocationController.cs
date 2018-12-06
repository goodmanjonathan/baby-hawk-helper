using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;

using BabyHawkHelperServer.Models;
using System.Diagnostics;

namespace BabyHawkHelperServer.Controllers {
    public class LocationController: ApiController {
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
        public async Task<Location[]> GetAll() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int id;
            try {
                id = obj.userId;
            } catch (Exception ex) {
                Debug.WriteLine("[LocationController::GetAll] invalid request payload: "
                    + ex.Message);
                throw ex;
            }

            var connString = ConfigurationManager.ConnectionStrings[profile].ConnectionString;

            try {
                using (var conn = new SqlConnection(connString)) {
                    conn.Open();
                    var query = "select distinct roomNumber, professor.name, "
                        + "courseTimes.startTime, courseTimes.endTime, course.name "
                        + "from student, enroll, course, location, professor, courseTimes "
                        + "where student.id = enroll.studentId and "
                        + "course.id = enroll.courseId and "
                        + "course.locationId = location.id and "
                        + "course.professorId = professor.id and "
                        + "course.id = courseTimes.courseId and "
                        + "student.id = @id";

                    using (var cmd = new SqlCommand(query, conn)) {
                        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                        using (var reader = cmd.ExecuteReader()) {
                            var locations = new List<Location>();
                            while (reader.Read()) {
                                var roomNumber = reader.GetString(0);
                                var professor = reader.GetString(1);
                                var startTime = reader.GetTimeSpan(2);
                                var endTime = reader.GetTimeSpan(3);
                                var courseName = reader.GetString(4);
                                locations.Add(new Location {
                                    RoomNumber = roomNumber,
                                    Professor = professor,
                                    StartTime = startTime,
                                    EndTime = endTime,
                                    CourseName = courseName,
                                });
                            }
                            Debug.WriteLine("[LocationController::GetAll] "
                                + "returning info for student "
                                + id.ToString() + ": " + locations.ToString());
                            return locations.ToArray();
                        }
                    }
                }
            } catch (Exception ex) {
                Debug.WriteLine("[LocationController::GetAll] failed to access database: "
                    + ex.Message);
                Debug.WriteLine(ex.StackTrace);
                throw ex;
            }
        }
    }
}
