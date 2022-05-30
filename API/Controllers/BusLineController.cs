using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Buses.BusLines;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BusLineController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<BusLine>>> GetBusLines()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<BusLine>> GetBusLine(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateBusLine(BusLine busLine)
        {
            return Ok(await Mediator.Send(new Create.Command { BusLine = busLine }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBusLine(Guid id, BusLine busLine)
        {
            busLine.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { BusLine = busLine }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusLine(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}