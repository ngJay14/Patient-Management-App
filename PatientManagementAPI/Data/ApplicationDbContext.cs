using Microsoft.EntityFrameworkCore;
using PatientManagementAPI.Model;

namespace PatientManagementAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options){ } 
        public DbSet<PatientEntity> Patient { get; set; }
        public DbSet<ContactEntity> Contact { get; set; }
        public DbSet<AddressEntity> Address { get; set; }
    }
}
