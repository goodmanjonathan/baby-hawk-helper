using System;

namespace BabyHawkHelperServer.Models {
    public class Course {
        public string CourseName { get; set; }
        public string Department { get; set; }
        public int CourseNumber { get; set; }
        public int SectionNumber { get; set; }

        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string[] Days { get; set; }

        public string Professor { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public TimeSpan[] OfficeHours { get; set; }
        
        public string Building { get; set; }
        public string RoomNumber { get; set; }
    }
}