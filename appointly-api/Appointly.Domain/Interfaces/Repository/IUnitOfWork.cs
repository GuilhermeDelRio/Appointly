namespace Appointly.Domain.Interfaces.Repository;

public interface IUnitOfWork
{
    Task Commit(CancellationToken cancellationToken);
}