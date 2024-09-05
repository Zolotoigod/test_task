using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using test_task.application.commons;
using test_task.application.employees.commands;
using test_task.application.employees.viewmodels;
using test_task.core;

namespace test_task.application.employees.handlers
{
    public class ReadCommandHandler : IRequestHandler<ReadCommand, IReadOnlyCollection<EmployeeVM>>
    {
        private readonly ITestContext _context;

        public ReadCommandHandler(ITestContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<EmployeeVM>> Handle(ReadCommand request, CancellationToken cancellationToken)
        {

            IQueryable<Employee> query;
            if(request.OrderBy == core.enums.SortRule.asc)
            {
                query = _context.Employees
                .Where(e => e.LastName.Contains(request.LastNameFilter) && e.Active)
                .OrderBy(e => e.LastName);
            }
            else
            {
                query = _context.Employees
                .Where(e => e.LastName.Contains(request.LastNameFilter) && e.Active)
                .OrderByDescending(e => e.LastName);
            }

            var result = await query.ToListAsync(cancellationToken);

            return result.Select(ToVm).ToImmutableArray();
        }

        private static EmployeeVM ToVm(Employee entity)
        {
            return new EmployeeVM
            {
                Id = entity.EmployeeId,
                Firstname = entity.FirstName,
                Lastname = entity.LastName,
                Age = entity.Age,
                Sex = entity.Sex,
            };
        }
    }
}
