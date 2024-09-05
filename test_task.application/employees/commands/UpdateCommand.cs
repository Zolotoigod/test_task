using MediatR;
using System.ComponentModel.DataAnnotations;

namespace test_task.application.employees.commands
{
    public class UpdateCommand : IRequest
    {
        public required string Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        [RegularExpression("M|F", ErrorMessage = "Can be M or F")]
        public string? Sex { get; set; }
        [Range(18, 100, ErrorMessage = "Should be between 18 and 100")]
        public int? Age { get; set; }
    }
}
