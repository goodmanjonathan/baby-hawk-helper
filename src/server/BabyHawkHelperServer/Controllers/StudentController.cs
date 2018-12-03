using System;
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
#if DEBUG
    [EnableCors(origins: "*", headers: "*", methods: "*")]
#endif
    public class StudentController: ApiController {
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
            int id;
            string password;
            string firstName;
            string lastName;
            try {
                id = obj.id;
                password = obj.password;
                firstName = obj.firstName;
                lastName = obj.lastName;
            } catch (Exception) {
                Debug.WriteLine("[StudentController::Insert] invalid request payload");
                return;
            }

            var connString = ConfigurationManager.ConnectionStrings[profile].ConnectionString;

            try {
                using (var conn = new SqlConnection(connString)) {
                    conn.Open();
                    var stmt = "insert into student (id, firstName, lastName, password) "
                        + "values (@id, @firstName, @lastName, @password)";
                    using (var cmd = new SqlCommand(stmt, conn)) {
                        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                        cmd.Parameters.Add("@firstName", SqlDbType.VarChar).Value = firstName;
                        cmd.Parameters.Add("@lastName", SqlDbType.VarChar).Value = lastName;
                        cmd.Parameters.Add("@password", SqlDbType.VarChar).Value =
                            BCrypt.Net.BCrypt.HashPassword(password);

                        cmd.ExecuteNonQuery();
                    }
                }
            } catch (SqlException ex) {
                Debug.WriteLine("[StudentController::Insert] failed to access database: " + ex.Message);
                throw ex;
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> Get() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int id;
            string password;
            try {
                id = obj.id;
                password = obj.password;
            } catch (Exception ex) {
                Debug.WriteLine("[StudentController::Get] invalid request payload");
                Debug.WriteLine(ex.StackTrace);
                return Ok(new Student {
                    Valid = false,
                    Reason = 2,
                    ReasonEx = "invalid request payload",
                });
            }

            var connString = ConfigurationManager.ConnectionStrings[profile].ConnectionString;

            try {
                using (var conn = new SqlConnection(connString)) {
                    conn.Open();
                    using (var cmd = new SqlCommand("select * from student where id=@id", conn)) {
                        cmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                        using (var reader = cmd.ExecuteReader()) {
                            bool foundId = reader.Read();

                            string hash;
                            if (foundId)
                                hash = reader.GetString(3);
                            else
                                hash = "";

                            var passwordMatch = BCrypt.Net.BCrypt.Verify(password, hash);

                            if (!foundId | !passwordMatch) {
                                Debug.WriteLine("[StudentController::Get] authentication failed for student: "
                                    + id.ToString() + ", password: " + password);
                                return Ok(new Student {
                                    Valid = false,
                                    Reason = 1,
                                });
                            } else {
                                var result = new Student {
                                    Valid = true,
                                    Id = id,
                                    FirstName = reader.GetString(0),
                                    LastName = reader.GetString(2),
                                };
                                Debug.WriteLine("[StudentController::Get] returning info for student "
                                    + id.ToString() + ": " + result.ToString());
                                return Ok(result);
                            }
                        }
                    }
                }
            } catch (Exception ex) {
                Debug.WriteLine("[StudentController::Get] failed to access database: " + ex.Message);
                return Ok(new Student {
                    Valid = false,
                    Reason = 2,
                    ReasonEx = ex.Message,
                });
            }
        }
    }
}
