using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Buses.BusLines
{
    public class List
    {
        public class Query :IRequest<List<BusLine>>{}
        public class Handler : IRequestHandler<Query, List<BusLine>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<BusLine>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BusLines.ToListAsync();
            }
        }
    }
}