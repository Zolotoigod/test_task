using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using test_task.application.commons;

namespace test_task.infrastructure
{
    public static class SetUpExtension
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            string employeesDb = configuration.GetConnectionString("Employees")!;
            services.AddDbContext<TestContext>(opt => opt.UseNpgsql(employeesDb), ServiceLifetime.Scoped);
            services.AddScoped<ITestContext>(provider => provider.GetRequiredService<TestContext>());

            return services;
        }
    }
}
