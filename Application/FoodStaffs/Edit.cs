using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.FoodStaffs
{
    public class Edit
    {
        public class Command: IRequest{
            public FoodStaff FoodStaff { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var foodstaff = await _context.FoodStaffs.FindAsync(request.FoodStaff.Id);
               
               _mapper.Map(request.FoodStaff, foodstaff);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}