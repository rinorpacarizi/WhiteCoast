using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Exercises
{
    public class Details
    {
        public class Query : IRequest<Exercise>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, Exercise>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Exercise> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Exercises.FindAsync(request.Id);
            }
        }
    }
}