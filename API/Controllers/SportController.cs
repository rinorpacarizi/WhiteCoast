using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Sports;
using MediatR;

namespace API.Controllers
{
    public class SportController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Sport>>> GetSports()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Sport>> GetSport(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateSport(Sport sport)
        {
            return Ok(await Mediator.Send(new Create.Command { Sport = sport }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSport(Guid id, Sport sport)
        {
            sport.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Sport = sport }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSport(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
