using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sports
{
    public class List
    {
        public class Query :IRequest<List<Sport>>{}
        public class Handler : IRequestHandler<Query, List<Sport>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Sport>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Sports.ToListAsync();
            }
        }
    }
}