using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.FoodStaffs
{
    public class Details
    {
        public class Query : IRequest<FoodStaff>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, FoodStaff>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<FoodStaff> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.FoodStaffs.FindAsync(request.Id);
            }
        }
    }
}