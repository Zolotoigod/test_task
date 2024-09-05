using MediatR;

namespace test_task.application.employees.commands
{
    public class DeleteCommand : IRequest
    {
        public required ICollection<string> Guids { get; set; }
    }
}
