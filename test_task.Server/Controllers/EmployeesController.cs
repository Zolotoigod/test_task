using MediatR;
using Microsoft.AspNetCore.Mvc;
using test_task.application.employees.commands;
using test_task.application.employees.viewmodels;

namespace test_task.Server.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EmployeesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create")]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("read")]
        [ProducesResponseType(typeof(List<EmployeeVM>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ReadEmployee([FromQuery] ReadCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete("delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteEmployee([FromBody] DeleteCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}
