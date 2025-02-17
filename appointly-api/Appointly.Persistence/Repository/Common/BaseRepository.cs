using Appointly.Domain.Common;
using Appointly.Domain.Interfaces.Repository;
using MongoDB.Driver;

namespace Appointly.Persistence.Repository.Common;

public class BaseRepository<T> : IBaseRepository<T> where T : BaseModel
{
    protected readonly IMongoCollection<T> _collection;

    protected BaseRepository(IMongoDatabase database, string collectionName)
    {
        _collection = database.GetCollection<T>(collectionName);
    }
    public async Task Create(T entity)
    {
        entity.DateCreated = DateTime.UtcNow;
        await _collection.InsertOneAsync(entity);
    }

    public async Task Update(T entity)
    {
        entity.DateUpdated = DateTime.UtcNow;
        var filter = Builders<T>.Filter.Eq(x => x.Id, entity.Id);
        await _collection.ReplaceOneAsync(filter, entity);
    }

    public async Task Delete(T entity)
    {
        var filter = Builders<T>.Filter.Eq(x => x.Id, entity.Id);
        await _collection.DeleteOneAsync(filter);
    }

    public async Task<T> GetById(string id, CancellationToken cancellationToken)
    {
        return await _collection
            .Find(entity => entity.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public IQueryable<T> GetAll(CancellationToken cancellationToken)
    {
        return _collection.AsQueryable();
    }
}