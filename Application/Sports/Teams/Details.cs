using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sports.Teams
{
    public class Details
    {
        public class Query : IRequest<Team>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, Team>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Team> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Teams.FindAsync(request.Id);
            }
        }
    }
}