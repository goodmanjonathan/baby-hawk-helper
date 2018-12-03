using System;
using System.Collections.Generic;

namespace BabyHawkHelperServer.Models {
    public class OfficeHours: IEquatable<OfficeHours> {
        public TimeSpan StartTime;
        public TimeSpan EndTime;

        public OfficeHours(TimeSpan start, TimeSpan end) {
            StartTime = start;
            EndTime = end;
        }

        bool IEquatable<OfficeHours>.Equals(OfficeHours other) {
            return StartTime == other.StartTime && EndTime == other.EndTime;
        }
    }

    public class Course {
        public int Id { get; set; }

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
        public OfficeHours[] OfficeHours { get; set; }
        
        public string Building { get; set; }
        public string RoomNumber { get; set; }
    }
}