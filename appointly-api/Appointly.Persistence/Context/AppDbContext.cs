using Appointly.Domain.Entities;
using Appointly.Persistence.Settings;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace Appointly.Persistence.Context;

public class AppDbContext : DbContext
{
    private readonly IMongoDatabase _database;
    
    public AppDbContext(MongoSettings settings)
    {
        MongoClient client = new MongoClient(settings.ConnectionString);
        _database = client.GetDatabase(settings.DatabaseName);
    }
    
    public IMongoCollection<Patient> Patients => _database.GetCollection<Patient>("patients");
}