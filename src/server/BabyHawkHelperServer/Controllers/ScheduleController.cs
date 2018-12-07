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
                    var query = "select course.id, course.name, course.department, "
                        + "course.courseNumber, course.courseSection, courseTimes.weekday, "
                        + "courseTimes.startTime, courseTimes.endTime, professor.name, "
                        + "professor.phone, professor.email, officeHours.startTime, "
                        + "officeHours.endTime, officeHours.weekday, location.buildingName, "
                        + "location.roomNumber "
                        + "from student, enroll, course, courseTimes, professor, officeHours, "
                        + "location "
                        + "where student.id = enroll.studentId and "
                        + "course.id = enroll.courseId and "
                        + "course.locationId = location.id and "
                        + "course.professorId = professor.id and "
                        + "courseTimes.courseId = course.id and "
                        + "officeHours.professorId = professor.id and "
                        + "student.id = @id";

                    using (var cmd = new SqlCommand(query, conn)) {
                        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                        using (var reader = cmd.ExecuteReader()) {
                            var courses = new List<Course>();

                            getCourse:  while (reader.Read()) {
                                var id_ = reader.GetInt32(0);
                                var existing = courses.Find((c) => c.Id == id_);

                                if (existing != null) {
                                    var weekday = reader.GetString(5);
                                    var officeHours_ = new OfficeHours(
                                        reader.GetTimeSpan(11),
                                        reader.GetTimeSpan(12),
                                        reader.GetString(13)
                                    );

                                    if (!Array.Exists(existing.Days, e => e == weekday)) {
                                        var newDays = new string[1 + existing.Days.Length];
                                        for (int i = 0; i < existing.Days.Length; i++)
                                            newDays[i] = existing.Days[i];
                                        newDays[newDays.Length - 1] = weekday;
                                        existing.Days = newDays;
                                    }
                                    if (!Array.Exists(
                                        existing.OfficeHours,
                                        e => e == officeHours_)
                                    ) {
                                        var newHours =
                                            new OfficeHours[1 + existing.OfficeHours.Length];
                                        for (int i = 0; i < existing.OfficeHours.Length; i++)
                                            newHours[i] = existing.OfficeHours[i];
                                        newHours[newHours.Length - 1] = officeHours_;
                                        existing.OfficeHours = newHours;
                                    }

                                    goto getCourse;
                                }

                                var courseName = reader.GetString(1);
                                var courseDepartment = reader.GetString(2);
                                var courseNumber = reader.GetInt32(3);
                                var courseSection = reader.GetInt32(4);
                                var days = new string[] {
                                    reader.GetString(5),
                                };
                                var startTime = reader.GetTimeSpan(6);
                                var endTime = reader.GetTimeSpan(7);
                                var professor = reader.GetString(8);
                                var professorPhone = reader.GetString(9);
                                var professorEmail = reader.GetString(10);
                                var officeHours = new OfficeHours[] {
                                    new OfficeHours(
                                        reader.GetTimeSpan(11),
                                        reader.GetTimeSpan(12),
                                        reader.GetString(13)
                                    ),
                                };
                                var buildingName = reader.GetString(14);
                                var roomNumber = reader.GetString(15);
                                courses.Add(new Course {
                                    Id = id_,
                                    CourseName = courseName,
                                    Department = courseDepartment,
                                    CourseNumber = courseNumber,
                                    SectionNumber = courseSection,
                                    StartTime = startTime,
                                    EndTime = endTime,
                                    Days = days,
                                    Professor = professor,
                                    Phone = professorPhone,
                                    Email = professorEmail,
                                    OfficeHours = officeHours,
                                    Building = buildingName,
                                    RoomNumber = roomNumber,
                                });
                            }
                            Debug.WriteLine("[ScheduleController::GetAll] "
                                + "returning info for student "
                                + id.ToString() + ": " + courses.ToString());
                            return courses.ToArray();
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
