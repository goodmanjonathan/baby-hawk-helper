namespace BabyHawkHelperServer.Models {
    public class Student {
        public bool Valid { get; set; }
        public int Reason { get; set; }
        public string ReasonEx { get; set; }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public override string ToString() {
            return "Student { Id: "
                + Id.ToString()
                + ", FirstName: "
                + FirstName.ToString()
                + ", LastName: "
                + LastName.ToString()
                + " }";
        }
    }
}