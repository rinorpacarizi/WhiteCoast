using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Buses
{
    public class Details
    {
        public class Query : IRequest<Bus>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, Bus>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Bus> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Buses.FindAsync(request.Id);
            }
        }
    }
}