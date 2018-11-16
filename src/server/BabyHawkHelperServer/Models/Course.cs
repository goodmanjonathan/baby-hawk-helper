using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyHawkHelperServer.Models {
    public class Course {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public int CourseNumber { get; set; }
        public int CourseSection { get; set; }
        public string Professor { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int LocationId { get; set; }
    }
}