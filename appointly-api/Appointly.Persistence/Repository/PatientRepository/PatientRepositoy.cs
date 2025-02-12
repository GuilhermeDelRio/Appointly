using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces;
using Appointly.Persistence.Repository.Common;
using MongoDB.Driver;

namespace Appointly.Persistence.Repository.PatientRepository;

public class PatientRepositoy : BaseRepository<Patient>, IPatientRepository
{
    public PatientRepositoy(IMongoDatabase database) : base(database, "patients") { }
}