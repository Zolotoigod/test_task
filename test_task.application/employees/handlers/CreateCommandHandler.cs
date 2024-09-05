using MediatR;
using test_task.application.commons;
using test_task.application.employees.commands;
using test_task.core;

namespace test_task.application.employees.handlers
{
    public class CreateCommandHandler : IRequestHandler<CreateCommand, Guid>
    {
        private readonly ITestContext _context;

        public CreateCommandHandler(ITestContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateCommand request, CancellationToken cancellationToken)
        {
            var employee = new Employee()
            {
                EmployeeId = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Age = request.Age,
                Sex = request.Sex,
                Active = true,
            };

            await _context.Employees.AddAsync(employee, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return employee.EmployeeId;
        }
    }
}
