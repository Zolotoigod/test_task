﻿using MediatR;
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var result = await _mediator.Send(command);
            //return Ok(result);
            return Ok();
        }

        [HttpGet("read")]
        [ProducesResponseType(typeof(List<EmployeeVM>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ReadEmployee([FromQuery] ReadCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete("delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteEmployee([FromBody] DeleteCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //await _mediator.Send(command);
            return Ok();
        }
    }
}
