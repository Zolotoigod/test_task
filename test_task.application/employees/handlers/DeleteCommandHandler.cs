using MediatR;
using Microsoft.EntityFrameworkCore;
using test_task.application.commons;
using test_task.application.employees.commands;

namespace test_task.application.employees.handlers
{
    public class DeleteCommandHandler : IRequestHandler<DeleteCommand>
    {
        private readonly ITestContext _context;

        public DeleteCommandHandler(ITestContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteCommand request, CancellationToken cancellationToken)
        {
            await _context.Employees
            .Where(employee => request.Guids.Contains(employee.EmployeeId.ToString()))
            .ForEachAsync(e => e.Active = false);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
