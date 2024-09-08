using Microsoft.EntityFrameworkCore;
using test_task.application.employees.commands;
using test_task.application.employees.handlers;
using test_task.core;

namespace test_task.application.tests
{
    [TestFixture]
    public class CommandsHandelersTests
    {
        private infrastructure.TestContext _mockContext;
        private CreateCommandHandler _createHandler;
        private DeleteCommandHandler _deleteHandler;
        private ReadCommandHandler _readHandler;
        private UpdateCommandHandler _updateHandler;
        private Guid CreateDeleteGuid = Guid.NewGuid();
        private Guid UpdateGuid = Guid.NewGuid();

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<infrastructure.TestContext>()
            .UseInMemoryDatabase("TestDatabase")
            .Options;

            _mockContext = new infrastructure.TestContext(options);
            _createHandler = new CreateCommandHandler(_mockContext);
            _deleteHandler = new DeleteCommandHandler(_mockContext);
            _readHandler = new ReadCommandHandler(_mockContext);
            _updateHandler = new UpdateCommandHandler(_mockContext);
        }

        [TearDown]
        public void TearDown()
        {
            _mockContext.Dispose();
        }

        [Test]
        [Order(0)]
        public void Seed()
        {
            var employees = new List<Employee>
            {
                new Employee { EmployeeId = UpdateGuid, FirstName = "John", LastName = "Doe", Age = 30, Sex = "M", Active = true },
                new Employee { EmployeeId = Guid.NewGuid(), FirstName = "Jane", LastName = "Smith", Age = 25, Sex = "F", Active = true },
                new Employee { EmployeeId = Guid.NewGuid(), FirstName = "Alice", LastName = "Johnson", Age = 35, Sex = "F", Active = true },
                new Employee { EmployeeId = Guid.NewGuid(), FirstName = "Bob", LastName = "Brown", Age = 40, Sex = "M", Active = false },
                new Employee { EmployeeId = Guid.NewGuid(), FirstName = "Charlie", LastName = "Davis", Age = 28, Sex = "M", Active = true },
                new Employee { EmployeeId = Guid.NewGuid(), FirstName = "Diana", LastName = "Wilson", Age = 32, Sex = "F", Active = false },
                new Employee { EmployeeId = Guid.NewGuid(), FirstName = "Eve", LastName = "Miller", Age = 29, Sex = "F", Active = true },
                new Employee { EmployeeId = CreateDeleteGuid, FirstName = "Frank", LastName = "Taylor", Age = 45, Sex = "M", Active = true }
            };

            _mockContext.Employees.AddRange(employees);
            _mockContext.SaveChangesAsync(CancellationToken.None).Wait();
        }

        [Test]
        [Order(1)]
        public async Task Handle_WhenAscendingOrder_ReturnsEmployeesOrderedByLastName()
        {
            var request = new ReadCommand
            {
                LastNameFilter = "e",
                OrderBy = core.enums.SortRule.asc
            };

            // Act
            var result = await _readHandler.Handle(request, CancellationToken.None);
            var list = result.ToList();

            // Assert
            Assert.That(list.Count, Is.EqualTo(2));
            Assert.That(list[0].Lastname, Is.EqualTo("Doe"));
            Assert.That(list[1].Lastname, Is.EqualTo("Miller"));
        }

        [Test]
        [Order(2)]
        public async Task Handle_ShouldCreateEmployeeAndReturnEmployeeId()
        {
            // Arrange
            var cancellationToken = CancellationToken.None;

            var createCommand = new CreateCommand
            {
                FirstName = "Frank",
                LastName = "Taylor",
                Age = 30,
                Sex = "M"
            };

            // Act
            var result = await _createHandler.Handle(createCommand, cancellationToken);

            var employee = new Employee
            {
                EmployeeId = result,
                FirstName = createCommand.FirstName,
                LastName = createCommand.LastName,
                Age = createCommand.Age,
                Sex = createCommand.Sex,
                Active = true
            };

            // Assert that a valid Guid was returned
            Assert.That(result, Is.TypeOf<Guid>());
            Assert.That(result, Is.Not.EqualTo(Guid.Empty));
            Assert.That(_mockContext.Employees.Contains(employee));
        }

        [Test]
        [Order(3)]
        public async Task Handle_ShouldDeactivateEmployees()
        {
            // Arrange
            var cancellationToken = CancellationToken.None;

            var command = new DeleteCommand { Guids = [CreateDeleteGuid.ToString()] };

            // Act
            await _deleteHandler.Handle(command, cancellationToken);
            var result = _mockContext.Employees.FirstOrDefault(e => e.LastName == "Taylor");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Active, Is.EqualTo(false));
        }

        
        [Test]
        [Order(4)]
        public async Task Handle_ShouldUpdateEmployeeDetails()
        {
            // Arrange
            var cancellationToken = CancellationToken.None;

            var command = new UpdateCommand
            {
                Id = UpdateGuid.ToString(),
                FirstName = "Mike",
                LastName = "Doe",
                Age = 25
            };

            // Act
            await _updateHandler.Handle(command, cancellationToken);
            var result = _mockContext.Employees.FirstOrDefault(e => e.LastName == "Doe");

            // Assert
            Assert.That(result?.FirstName, Is.EqualTo("Mike"));
            Assert.That(result.Age, Is.EqualTo(25));
            Assert.That(result.Sex, Is.EqualTo("M"));
        }
    }
}