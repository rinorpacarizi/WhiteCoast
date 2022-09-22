using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.FoodStaffs.Foods;
using MediatR;

namespace API.Controllers
{
    public class FoodController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Food>>> GetFoods()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Food>> GetFood(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateFood(Food food)
        {
            return Ok(await Mediator.Send(new Create.Command { Food = food }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditFood(Guid id, Food food)
        {
            food.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Food = food }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFood(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
