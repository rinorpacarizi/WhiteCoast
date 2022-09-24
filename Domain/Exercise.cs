using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Exercise
    {
        public Guid Id { get; set; } 
        public string Name{ get; set; }
        public string Location { get; set; }
        public string Time{ get; set; }
    }
}