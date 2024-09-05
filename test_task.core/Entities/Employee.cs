namespace test_task.core;

public partial class Employee
{
    public Guid EmployeeId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int? Age { get; set; }

    public string Sex { get; set; } = null!;

    public bool Active { get; set; } = true;
}
