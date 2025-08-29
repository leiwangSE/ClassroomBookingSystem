using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Classroom> Classrooms { get; set; }
    public DbSet<Booking> Bookings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed classrooms 1-10
        for (int i = 1; i <= 10; i++)
        {
            modelBuilder.Entity<Classroom>().HasData(new Classroom
            {
                Id = i,
                Name = $"Classroom {i}",
                Capacity = 30,
                IsActive = true
            });
        }

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany()
            .HasForeignKey(b => b.UserId);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Classroom)
            .WithMany()
            .HasForeignKey(b => b.ClassroomId);
    }
}
