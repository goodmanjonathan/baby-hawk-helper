using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

using BabyHawkHelperServer.Models;

namespace BabyHawkHelperServer.Controllers
{
    public class StudentController : ApiController
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(
            System.Reflection.MethodBase.GetCurrentMethod().DeclaringType
        );

        public IHttpActionResult GetStudent(int id/*, string password*/) {
            return Ok(new Student {
                Id = id,
                FirstName = "Jonathan",
                LastName = "Goodman",
                Password = "foo",
            });


            var connString = ConfigurationManager.ConnectionStrings["main"].ConnectionString;
            var query = "select * from student where stuid = @stuid";

            try {
                var conn = new SqlConnection(connString);
                var cmd = new SqlCommand(query, conn);
                cmd.Parameters.Add("@stuid", SqlDbType.Int).Value = id;
                conn.Open();

                var reader = cmd.ExecuteReader();
                IHttpActionResult result;

                if (!reader.Read()) {
                    result = NotFound();
                } else {
                    var actualPassword = reader.GetString(3);
                    /*if (actualPassword != password) {
                        result = NotFound();
                    } else {*/
                        result = Ok(new Student {
                            Id = reader.GetInt32(0),
                            FirstName = reader.GetString(1),
                            LastName = reader.GetString(2),
                            Password = actualPassword,
                        });
                    //}                   
                }

                cmd.Dispose();
                conn.Close();

                log.Info("[StudentController] returning info for student "
                    + id.ToString() + ": " + result.ToString());
                return result;
            } catch (Exception ex) {
                log.Error("[StudentController] failed to access database: " + ex.Message);
                return NotFound();
            }
        }
    }
}
