using Appointly.Domain.Common;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Persistence.Repository.Common;

public class BaseRepository<T> : IBaseRepository<T> where T : BaseModel
{
    protected readonly AppDbContext _context;

    protected BaseRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public void Create(T entity)
    {
        entity.DateCreated = DateTime.UtcNow;
        _context.Add(entity);
    }

    public async Task<T> GetById(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Set<T>()
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public void Update(T entity)
    {
        entity.DateUpdated = DateTime.UtcNow;
        _context.Update(entity);
    }
    
    public IQueryable<T> GetAll(CancellationToken cancellationToken)
    {
        return _context.Set<T>().AsNoTracking();
    }

    public void Delete(T entity)
    {
        entity.DateDeleted = DateTime.UtcNow;
        _context.Remove(entity);
    }
    
    public async Task BulkDelete(List<Guid> ids, CancellationToken cancellation)
    {
        var entities = await _context.Set<T>()
            .AsNoTracking()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellation);

        if (entities.Any())
        {
            _context.Set<T>().RemoveRange(entities);
            await _context.SaveChangesAsync(cancellation);
        }
    }
}