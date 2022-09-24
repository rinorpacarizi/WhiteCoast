using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Lectures
{
    public class List
    {
        public class Query :IRequest<List<Lecture>>{}
        public class Handler : IRequestHandler<Query, List<Lecture>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Lecture>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Lectures.ToListAsync();
            }
        }
    }
}