using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sports.Teams
{
    public class List
    {
        public class Query :IRequest<List<Team>>{}
        public class Handler : IRequestHandler<Query, List<Team>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Team>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Teams.ToListAsync();
            }
        }
    }
}