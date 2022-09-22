using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sports.Matches
{
    public class List
    {
        public class Query :IRequest<List<Match>>{}
        public class Handler : IRequestHandler<Query, List<Match>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Match>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Matches.ToListAsync();
            }
        }
    }
}