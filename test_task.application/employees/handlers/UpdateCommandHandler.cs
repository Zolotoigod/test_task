using MediatR;
using test_task.application.commons;
using test_task.application.employees.commands;

namespace test_task.application.employees.handlers
{
    public class UpdateCommandHandler : IRequestHandler<UpdateCommand>
    {
        private readonly ITestContext _context;

        public UpdateCommandHandler(ITestContext context)
        {
            _context = context;
        }

        public async Task Handle(UpdateCommand request, CancellationToken cancellationToken)
        {
            var emploeeToUpdate = await _context.Employees.FindAsync(Guid.Parse(request.Id), cancellationToken);

            if (emploeeToUpdate != null)
            {
                emploeeToUpdate.FirstName = request.FirstName != null ? request.FirstName : emploeeToUpdate.FirstName;
                emploeeToUpdate.LastName = request.LastName != null ? request.LastName : emploeeToUpdate.LastName;
                emploeeToUpdate.Age = request.Age != null ? request.Age : emploeeToUpdate.Age;
                emploeeToUpdate.Sex = request.Sex != null ? request.Sex : emploeeToUpdate.Sex;
            }

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
