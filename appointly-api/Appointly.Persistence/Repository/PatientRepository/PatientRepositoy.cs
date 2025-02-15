using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Repository.Common;
using MongoDB.Driver;

namespace Appointly.Persistence.Repository.PatientRepository;

public class PatientRepository : BaseRepository<Patient>, IPatientRepository
{
    public PatientRepository(IMongoDatabase database) : base(database, "patients") { }
    public async Task<bool> FindByFirstNameAndLastName(string firstName, string lastName)
    {
        var filter = Builders<Patient>.Filter.And(
            Builders<Patient>.Filter.Eq(p => p.FirstName, firstName),
            Builders<Patient>.Filter.Eq(p => p.LastName, lastName));
        
        return await _collection.Find(filter).AnyAsync();
    }
}