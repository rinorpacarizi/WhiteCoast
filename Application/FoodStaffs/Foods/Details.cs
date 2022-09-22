using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.FoodStaffs.Foods
{
    public class Details
    {
        public class Query : IRequest<Food>{
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Query, Food>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Food> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Foods.FindAsync(request.Id);
            }
        }
    }
}