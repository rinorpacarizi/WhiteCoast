using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Sports.Teams;
using MediatR;

namespace API.Controllers
{
    public class TeamController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Team>>> GetTeams()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Team>> GetTeam(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam(Team team)
        {
            return Ok(await Mediator.Send(new Create.Command { Team = team }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTeam(Guid id, Team team)
        {
            team.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Team = team }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
