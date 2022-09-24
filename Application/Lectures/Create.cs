using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Lectures
{
    public class Create
    {
        public class Command : IRequest{
            public Lecture Lecture{get;set;}
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Lectures.Add(request.Lecture);
                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}