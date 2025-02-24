using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Repository.Common;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Appointly.Persistence.Repository;

public class PatientRepository : BaseRepository<Patient>, IPatientRepository
{
    public PatientRepository(IMongoDatabase database) : base(database, "patients") { }
    public async Task<bool> FindByFirstNameAndLastName(string firstName, string lastName)
    {
        var filter = Builders<Patient>.Filter.And(
            Builders<Patient>
                .Filter.Regex(p => p.FirstName, new BsonRegularExpression($"^{firstName}$", "i")),
            Builders<Patient>
                .Filter.Regex(p => p.LastName, new BsonRegularExpression($"^{lastName}$", "i")));
        
        return await _collection.Find(filter).AnyAsync();
    }
}