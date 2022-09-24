using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Lectures;
using MediatR;

namespace API.Controllers
{
    public class LectureController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Lecture>>> GetLectures()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Lecture>> GetLecture(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateLecture(Lecture lecture)
        {
            return Ok(await Mediator.Send(new Create.Command { Lecture = lecture }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLecture(Guid id, Lecture lecture)
        {
            lecture.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Lecture = lecture }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLecture(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }

    }
}
