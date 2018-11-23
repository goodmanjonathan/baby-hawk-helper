using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

using Newtonsoft.Json.Linq;

using BabyHawkHelperServer.Models;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace BabyHawkHelperServer.Controllers {
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class StudentController: ApiController {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(
            System.Reflection.MethodBase.GetCurrentMethod().DeclaringType
        );

        [HttpPost]
        public async void Insert() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int id = obj.id;
            string password = obj.password;
            string firstName = obj.firstName;
            string lastName = obj.lastName;

            var connString = ConfigurationManager.ConnectionStrings["dev"].ConnectionString;

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
                log.Error("[StudentController] failed to access database: " + ex.Message);
                throw ex;
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> Get() {
            dynamic obj = await Request.Content.ReadAsAsync<JObject>();
            int id = obj.id;
            string password = obj.password;

            var connString = ConfigurationManager.ConnectionStrings["dev"].ConnectionString;

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
                                log.Info("[StudentController] authentication failed for student: "
                                    + id.ToString() + ", password: " + password);
                                return Ok(new Student {
                                    Valid = false,
                                    Reason = 1,
                                });
                            } else {
                                var result = Ok(new Student {
                                    Valid = true,
                                    Id = id,
                                    FirstName = reader.GetString(0),
                                    LastName = reader.GetString(2),
                                });
                                log.Info("[StudentController] returning info for student "
                                    + id.ToString() + ": " + result.ToString());
                                return result;
                            }
                        }
                    }
                }
            } catch (Exception ex) {
                log.Error("[StudentController] failed to access database: " + ex.Message);
                return Ok(new Student {
                    Valid = false,
                    Reason = 2,
                    ReasonEx = ex.Message,
                });
            }
        }
    }
}
