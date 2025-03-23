using Appointly.Domain.Entities;

namespace Appointly.Domain.Interfaces.Repository;

public interface IPatientRepository : IBaseRepository<Patient>
{
    Task<Patient?> FindByFirstNameAndLastName(string firstName, string lastName);
}