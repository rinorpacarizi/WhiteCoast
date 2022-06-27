using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Buses;
using MediatR;

namespace API.Controllers
{
    public class BusController : BaseApiController
    {

         [HttpGet]
        public async Task<ActionResult<List<Bus>>> GetBuses()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Bus>> GetBus(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateBus(Bus bus)
        {
            return Ok(await Mediator.Send(new Create.Command { Bus = bus }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBus(Guid id, Bus bus)
        {
            bus.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Bus = bus }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBus(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
