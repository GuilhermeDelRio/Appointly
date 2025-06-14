using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Context;
using Appointly.Persistence.Repository.Common;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Persistence.Repository;

public class PatientRepository : BaseRepository<Patient>, IPatientRepository
{
    public PatientRepository(AppDbContext context) : base(context) { }
    public async Task<Patient?> FindByFirstNameAndLastName(string firstName, string lastName)
    {
         return await _context.Patients
             .AsNoTracking()
             .FirstOrDefaultAsync(p => p.FirstName == firstName && p.LastName == lastName);
    }
}