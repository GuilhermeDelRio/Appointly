// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Design;
//
// namespace Appointly.Persistence.Context;
//
// public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
// {
//     public AppDbContext CreateDbContext(string[] args)
//     {
//         var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
//         
//         optionsBuilder.UseNpgsql("AppointlyConnectionString");
//
//         return new AppDbContext(optionsBuilder.Options);
//     }
// }