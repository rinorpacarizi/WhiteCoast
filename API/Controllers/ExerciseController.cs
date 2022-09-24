using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Exercises;
using MediatR;

namespace API.Controllers
{
    public class ExerciseController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Exercise>>> GetExercises()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Exercise>> GetExercise(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateExercise(Exercise exercise)
        {
            return Ok(await Mediator.Send(new Create.Command { Exercise = exercise }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditExercise(Guid id, Exercise exercise)
        {
            exercise.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Exercise = exercise }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
