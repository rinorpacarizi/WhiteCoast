using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sports
{
    public class Details
    { 
        public class Query : IRequest<Sport>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, Sport>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Sport> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Sports.FindAsync(request.Id);
            }
        }
        
    }
}