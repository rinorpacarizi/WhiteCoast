using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Lectures
{
    public class Details
    {
        public class Query : IRequest<Lecture>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, Lecture>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Lecture> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Lectures.FindAsync(request.Id);
            }
        }
    }
}