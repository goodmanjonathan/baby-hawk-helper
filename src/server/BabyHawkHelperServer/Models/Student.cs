using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyHawkHelperServer.Models {
    public class Student {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }

        public override string ToString() {
            return "Student { Id: "
                + Id.ToString()
                + ", FirstName: "
                + FirstName.ToString()
                + ", LastName: "
                + LastName.ToString()
                + ", Password: "
                + Password.ToString()
                + "}";
        }
    }
}