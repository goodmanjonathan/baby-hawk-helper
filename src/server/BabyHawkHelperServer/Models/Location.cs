using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyHawkHelperServer.Models {
    public class Location {
        public string RoomNumber { get; set; }
        public string Professor { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string CourseName { get; set; }
    }
}