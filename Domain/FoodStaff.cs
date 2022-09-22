using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class FoodStaff
    {
        public Guid Id { get; set; }
        public string FullName {get;set;}
        public int PhoneNum {get;set;}
        public string Role { get; set; }
    }
}