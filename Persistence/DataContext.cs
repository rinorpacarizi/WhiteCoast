using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Bus> Buses{get;set;}
        public DbSet<BusLine> BusLines{get;set;}
        public DbSet<Sport> Sports{get;set;}
        public DbSet<Team> Teams{get;set;}
        public DbSet<Match> Matches{get;set;}
        public DbSet<Food> Foods{get;set;}
        public DbSet<FoodStaff> FoodStaffs{get;set;}
        public DbSet<Mission> Missions{get;set;}
        public DbSet<Exercise> Exercises{get;set;}
        public DbSet<Lecture> Lectures{get;set;}
    }
}