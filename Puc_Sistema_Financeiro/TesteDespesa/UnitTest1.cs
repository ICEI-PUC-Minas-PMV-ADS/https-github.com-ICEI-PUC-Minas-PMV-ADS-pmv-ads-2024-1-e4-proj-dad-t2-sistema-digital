using Microsoft.VisualStudio.TestTools.UnitTesting;
using MongoDB.Bson.Serialization.Attributes;
using Puc_Sistema_Financeiro.Models;

namespace TesteDespesa
{
    [TestClass]
    public class DespesaTeste
    {
        [TestMethod]
        public void TestarMapeamentoDespesa()
        {
           
            var despesa = new Despesa
            {
                Id = "664159a14a51a293f8b756ca2145",
                Nome = "Conta de Luz",
                Valor = 100.00m,
                Mes = 5,
                Ano = 2024,
                TipoDespesa = "Energia",
                DataCadastro = "2024-05-12",
                DataPagamento = "2024-05-10",
                DataVencimento = "2024-05-05",
                Pago = true,
                DespesaAntrasada = false,
                CategoriaId = "664159a14a51a293f8b756ca"
            };

          
            Assert.IsNotNull(despesa.Id); 
            Assert.AreEqual("Conta de Luz", despesa.Nome);
            Assert.AreEqual(100.00m, despesa.Valor);
            Assert.AreEqual(5, despesa.Mes);
            Assert.AreEqual(2024, despesa.Ano);
            Assert.AreEqual("Energia", despesa.TipoDespesa);
            Assert.AreEqual("2024-05-12", despesa.DataCadastro);
            Assert.AreEqual("2024-05-10", despesa.DataPagamento);
            Assert.AreEqual("2024-05-05", despesa.DataVencimento);
            Assert.IsTrue(despesa.Pago);
            Assert.IsFalse(despesa.DespesaAntrasada);
            Assert.AreEqual("664159a14a51a293f8b756ca", despesa.CategoriaId);
        }

        [TestMethod]
        public void TestarAtributosBson()
        {
            
            var despesa = new Despesa();

           
            Assert.IsTrue(despesa.GetType().GetProperty("Id").GetCustomAttributes(typeof(BsonIdAttribute), true).Length > 0);
            Assert.IsTrue(despesa.GetType().GetProperty("Nome").GetCustomAttributes(typeof(BsonElementAttribute), true).Length > 0);
            Assert.IsTrue(despesa.GetType().GetProperty("TipoDespesa").GetCustomAttributes(typeof(BsonRepresentationAttribute), true).Length > 0);
            Assert.IsTrue(despesa.GetType().GetProperty("DataCadastro").GetCustomAttributes(typeof(BsonRepresentationAttribute), true).Length > 0);
            Assert.IsTrue(despesa.GetType().GetProperty("DataPagamento").GetCustomAttributes(typeof(BsonRepresentationAttribute), true).Length > 0);
            Assert.IsTrue(despesa.GetType().GetProperty("DataVencimento").GetCustomAttributes(typeof(BsonRepresentationAttribute), true).Length > 0);
        }
    }
}
