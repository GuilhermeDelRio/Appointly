using Appointly.Domain.Entities;

namespace Appointly.Domain.Interfaces.Repository;

public interface IPatientRepository : IBaseRepository<Patient>
{
    Task<bool> FindByFirstNameAndLastName(string firstName, string lastName);
}