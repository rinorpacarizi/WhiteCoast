using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Match
    {
        public Guid Id { get; set; }
        public string Name {get;set;}
        public string Sport { get; set; }
        public string Team {get;set;}
        public string Location { get; set; }
    }
}