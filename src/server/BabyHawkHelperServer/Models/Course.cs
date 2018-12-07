using System;
using System.Collections.Generic;

namespace BabyHawkHelperServer.Models {
    public class OfficeHours {
        public TimeSpan StartTime;
        public TimeSpan EndTime;
        public string Weekday;

        public OfficeHours(TimeSpan start, TimeSpan end, string weekday) {
            StartTime = start;
            EndTime = end;
            Weekday = weekday;
        }

        public static bool operator==(OfficeHours lhs, OfficeHours rhs) {
            return lhs.StartTime == rhs.StartTime
                && lhs.EndTime == rhs.EndTime
                && lhs.Weekday == rhs.Weekday;
        }

        public static bool operator!=(OfficeHours lhs, OfficeHours rhs) {
            return !(lhs == rhs);
        }

        public override bool Equals(object other) {
            return this == (OfficeHours)other;
        }

        public override int GetHashCode() {
            return base.GetHashCode();
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