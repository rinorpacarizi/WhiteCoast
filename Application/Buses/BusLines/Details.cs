using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Buses.BusLines
{
    public class Details
    {
        public class Query : IRequest<BusLine>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, BusLine>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<BusLine> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.BusLines.FindAsync(request.Id);
            }
        }
    }
}