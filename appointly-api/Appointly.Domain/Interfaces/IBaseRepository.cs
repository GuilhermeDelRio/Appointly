using Appointly.Domain.Common;

namespace Appointly.Domain.Interfaces;

public interface IBaseRepository<T> where T : BaseModel
{
    Task Create(T entity);
    Task Update(T entity);
    Task Delete(T entity);
    Task<T> GetById(string id, CancellationToken cancellationToken);
    Task<IReadOnlyList<T>> GetAll(CancellationToken cancellationToken);
}