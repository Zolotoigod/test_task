using Microsoft.EntityFrameworkCore;
using test_task.core;

namespace test_task.application.commons
{
    public interface ITestContext
    {
        public DbSet<Employee> Employees { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
