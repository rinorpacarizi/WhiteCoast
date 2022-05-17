using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    public class BusController : BaseApiController
    {

        public DataContext _context { get; }

        public BusController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Bus>>> GetBuses()
        {
            return await _context.Buses.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Bus>> GetBus(Guid id)
        {
            return await _context.Buses.FindAsync(id);
        }
    }
}
