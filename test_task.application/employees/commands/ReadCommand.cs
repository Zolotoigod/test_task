using MediatR;
using test_task.application.employees.viewmodels;
using test_task.core.enums;

namespace test_task.application.employees.commands
{
    public class ReadCommand : IRequest<IReadOnlyCollection<EmployeeVM>>
    {
        public string LastNameFilter { get; set; } = string.Empty;
        public SortRule OrderBy { get; set; } = SortRule.asc;
    }
}
