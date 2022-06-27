using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class BusLine
    {
        public Guid Id { get; set; }
        public string Start{get;set;}
        public string End { get; set; }
        public string StartTime {get;set;}
        public string EndTime {get;set;}
        public string Bus{get;set;}
    }
}