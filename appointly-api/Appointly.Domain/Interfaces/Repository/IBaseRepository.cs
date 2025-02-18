using Appointly.Domain.Common;

namespace Appointly.Domain.Interfaces.Repository;

public interface IBaseRepository<T> where T : BaseModel
{
    Task Create(T entity);
    Task Update(T entity);
    Task Delete(string id);
    Task<T> GetById(string id, CancellationToken cancellationToken);
    IQueryable<T> GetAll(CancellationToken cancellationToken);
}