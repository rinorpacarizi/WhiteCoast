using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sports
{
    public class Edit
    {
        public class Command: IRequest{
            public Sport Sport { get; set; }
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
                var sport = await _context.Sports.FindAsync(request.Sport.Id);
               
               _mapper.Map(request.Sport, sport);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}