using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<BusLine, BusLine>();
            CreateMap<Bus,Bus>();
            CreateMap<Sport,Sport>();
            CreateMap<Team,Team>();
            CreateMap<Match,Match>();
            CreateMap<Food,Food>();
            CreateMap<FoodStaff,FoodStaff>();
            CreateMap<Mission,Mission>();
            CreateMap<Exercise,Exercise>();
            CreateMap<Lecture,Lecture>();
        }
    }
}