using Microsoft.EntityFrameworkCore;
using test_task.application.commons;
using test_task.core;

namespace test_task.infrastructure;

public partial class TestContext : DbContext, ITestContext
{
    public TestContext()
    {
    }

    public TestContext(DbContextOptions<TestContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("public");
        base.OnModelCreating(modelBuilder);
    }
}
