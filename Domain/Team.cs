using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name {get;set;}
        public string Sport { get; set; }
        public int TotalSpace {get;set;}
        public int FreeSpace {get;set;}
        
    }
}