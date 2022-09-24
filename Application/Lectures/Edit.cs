using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Lectures
{
    public class Edit
    {
        public class Command: IRequest{
            public Lecture Lecture { get; set; }
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
                var lecture = await _context.Lectures.FindAsync(request.Lecture.Id);
               
               _mapper.Map(request.Lecture, lecture);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}