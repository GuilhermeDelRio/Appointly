using Appointly.Domain.Common;

namespace Appointly.Domain.Interfaces.Repository;

public interface IBaseRepository<T> where T : BaseModel
{
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<T> GetById(Guid id, CancellationToken cancellationToken);
    IQueryable<T> GetAll(CancellationToken cancellationToken);
    Task BulkDelete(List<Guid> ids, CancellationToken cancellation);
}