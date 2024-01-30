using AutoMapper;
using BackEnd___Proyecto.Models.DTO;
using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Writers;

namespace BackEnd___Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IItemsRepository _repository;

        public ItemsController(IMapper mapper, IItemsRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var list = await _repository.readList();
                var listDTO = _mapper.Map<ItemDTO[]>(list);
                return Ok(listDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var objeto = await _repository.read1(id);
                if (objeto == null) return NotFound();
                var objetoDTO = _mapper.Map<ItemDTO>(objeto);
                return Ok(objetoDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ItemDTO objetoDTO)
        {
            try
            {
                var objeto = _mapper.Map<Item>(objetoDTO);

                objeto.FechaRegistro = DateTime.Now;
                objeto.OrdenId = null;
                objeto.EstadoId = 1; // asumiendo que 1 = activo

                await _repository.create(objeto);
                var objetoDTOFinal = _mapper.Map<ItemDTO>(objeto);
                return CreatedAtAction("Get", new { Id = objeto.ItemId }, objetoDTOFinal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var objeto = await _repository.read1(id);
                if (objeto == null) return NotFound();
                await _repository.delete(objeto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ItemDTO objetoEditedDTO)
        {
            try
            {
                var objetoEdited = _mapper.Map<Item>(objetoEditedDTO);

                if (id != objetoEdited.ItemId) throw new Exception();

                var objetoBase = await _repository.read1(id);

                if (objetoBase == null) return NotFound();

                await _repository.update(objetoBase, objetoEdited);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

