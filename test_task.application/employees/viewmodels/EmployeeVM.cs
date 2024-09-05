using System.ComponentModel;

namespace test_task.application.employees.viewmodels
{
    public class EmployeeVM
    {
        public Guid Id { get; set; }  
        public string Firstname { get; set; } = null!;

        public string Lastname { get; set; } = null!;

        public int? Age { get; set; }

        public string Sex { get; set; } = null!;
    }
}
