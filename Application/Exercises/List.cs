using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Exercises
{
    public class List
    {
        public class Query :IRequest<List<Exercise>>{}
        public class Handler : IRequestHandler<Query, List<Exercise>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Exercise>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Exercises.ToListAsync();
            }
        }
    }
}