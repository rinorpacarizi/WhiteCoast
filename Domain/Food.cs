using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Food
    {
        public Guid Id { get; set; }
        public string Name {get;set;}
        public string Size { get; set; }
        public string Time {get;set;}
        public string Cheff {get;set;}
    }
}