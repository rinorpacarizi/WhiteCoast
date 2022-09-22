using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.FoodStaffs;
using MediatR;

namespace API.Controllers
{
    public class FoodStaffController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<FoodStaff>>> GetStaffs()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<FoodStaff>> GetStaff(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateStaff(FoodStaff foodstaff)
        {
            return Ok(await Mediator.Send(new Create.Command { FoodStaff = foodstaff }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMatch(Guid id, FoodStaff foodstaff)
        {
            foodstaff.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { FoodStaff = foodstaff }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
