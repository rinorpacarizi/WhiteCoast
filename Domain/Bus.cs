using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Bus
    {
        public Guid Id { get; set; } 
        public string Fullname { get; set; }
        public int PhoneNum{ get; set; }
        public int BusNum { get; set; }
    }
}