using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Missions
{
    public class Edit
    {
        public class Command: IRequest{
            public Mission Mission { get; set; }
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
                var mission = await _context.Missions.FindAsync(request.Mission.Id);
               
               _mapper.Map(request.Mission, mission);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}