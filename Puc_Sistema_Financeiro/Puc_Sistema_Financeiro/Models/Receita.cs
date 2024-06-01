using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Puc_Sistema_Financeiro.Models
{
    public class Receita
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Nome")]
        public string? Nome { get; set; }

        public decimal Valor { get; set; }
        public int Mes { get; set; }
        public int Ano { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string? TipoReceita { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string? DataCadastro { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string? DataAlteracao { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string? DataRecebimento { get; set; }

        public string? CategoriaId { get; set; }
    }
}
