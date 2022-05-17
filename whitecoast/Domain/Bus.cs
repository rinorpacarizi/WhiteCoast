using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Bus
    {
        public Guid Id { get; set; } 
        public String Fullname { get; set; }
        public int PhoneNum{ get; set; }
        public int BusNum { get; set; }
        public DateTime StartingTime { get; set; }
        public String Path { get; set; }
    }
}