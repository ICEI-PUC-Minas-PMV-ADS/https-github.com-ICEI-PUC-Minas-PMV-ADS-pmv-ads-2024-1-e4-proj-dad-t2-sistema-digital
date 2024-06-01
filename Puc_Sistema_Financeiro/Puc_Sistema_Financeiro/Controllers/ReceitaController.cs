using Microsoft.AspNetCore.Mvc;
using Puc_Sistema_Financeiro.Models;
using Puc_Sistema_Financeiro.Services;

namespace Puc_Sistema_Financeiro.Controllers
{
    [Route("api/receita")]
    [ApiController]
    public class ReceitaController : ControllerBase
    {
        private readonly ReceitaService _receitaService;

        public ReceitaController(ReceitaService receitaService)
        {
            _receitaService = receitaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Receita>>> GetReceitas()
        {
            var receitas = await _receitaService.GetAsync();
            return Ok(receitas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Receita>> GetReceita(string id)
        {
            var receita = await _receitaService.GetAsync(id);
            if (receita == null)
            {
                return NotFound();
            }
            return receita;
        }

        [HttpPost]
        public async Task<ActionResult<Receita>> PostReceita(Receita receita)
        {
            receita.Id = null;

            await _receitaService.CreateAsync(receita);
            return CreatedAtAction(nameof(GetReceita), new { id = receita.Id }, receita);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceita(string id, Receita receita)
        {
            if (id != receita.Id)
            {
                return BadRequest();
            }
            await _receitaService.UpdateAsync(id, receita);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceita(string id)
        {
            var receita = await _receitaService.GetAsync(id);
            if (receita == null)
            {
                return NotFound();
            }
            await _receitaService.RemoveAsync(id);
            return NoContent();
        }
    }
}
