using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Puc_Sistema_Financeiro.Models;

namespace Puc_Sistema_Financeiro.Services
{
    public class ReceitaService
    {
        private readonly IMongoCollection<Receita> _receitaCollection;

        public ReceitaService(IOptions<ReceitaDataBaseSettings> receitaSettings)
        {
            var mongoClient = new MongoClient(receitaSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(receitaSettings.Value.DatabaseName);

            _receitaCollection = mongoDatabase.GetCollection<Receita>
                (receitaSettings.Value.ReceitaCollectionName);

        }

        public async Task<List<Receita>> GetAsync() =>
            await _receitaCollection.Find(x => true).ToListAsync();
        public async Task<Receita> GetAsync(string id) =>
           await _receitaCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Receita receita) =>
            await _receitaCollection.InsertOneAsync(receita);
        public async Task UpdateAsync(string id, Receita receita) =>
           await _receitaCollection.ReplaceOneAsync(x => x.Id == id, receita);
        public async Task RemoveAsync(string id) =>
            await _receitaCollection.DeleteOneAsync(x => x.Id == id);
    }
}
