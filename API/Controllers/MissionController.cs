using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Missions;
using MediatR;

namespace API.Controllers
{
    public class MissionController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Mission>>> GetMissions()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Mission>> GetMission(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateMission(Mission mission)
        {
            return Ok(await Mediator.Send(new Create.Command { Mission = mission }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMission(Guid id, Mission mission)
        {
            mission.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Mission = mission }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMission(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
