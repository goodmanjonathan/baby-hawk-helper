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
    public class ScheduleController: ApiController {
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
        public async Task<Course[]> GetAll() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int id;
            try {
                id = obj.userId;
            } catch (Exception ex) {
                Debug.WriteLine("[ScheduleController::GetAll] invalid request payload");
                throw ex;
            }

            var connString = ConfigurationManager.ConnectionStrings[profile].ConnectionString;

            try {
                using (var conn = new SqlConnection(connString)) {
                    conn.Open();
                    var query = "select course.name, course.department, course.courseNumber, "
                        + "course.courseSection, courseTimes.weekday, professor.name, "
                        + "professor.phone, professor.email, officeHours.startTime, "
                        + "officeHours.endTime, location.buildingName, location.roomNumber "
                        + "from student, enroll, course, courseTimes, professor, officeHours, "
                        + "location "
                        + "where student.id = enroll.studentId and "
                        + "course.id = enroll.courseId and "
                        + "course.locationId = location.id and "
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
                                locations.Add(new Location {
                                    RoomNumber = roomNumber,
                                    Professor = professor,
                                    StartTime = startTime,
                                    EndTime = endTime,
                                });
                            }
                            log.Info("[ScheduleController::GetAll] returning info for student "
                                + id.ToString() + ": " + locations.ToString());
                            return new Course[0];
                        }
                    }
                }
            } catch (Exception ex) {
                Debug.WriteLine("[ScheduleController::GetAll] failed to access database: "
                    + ex.Message);
                Debug.WriteLine(ex.StackTrace);
                throw ex;
            }
        }
    }
}
