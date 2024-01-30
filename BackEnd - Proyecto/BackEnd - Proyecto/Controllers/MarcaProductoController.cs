using AutoMapper;
using BackEnd___Proyecto.Models.DTO;
using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd___Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcaProductoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMarcaProductoRepository _repository;

        public MarcaProductoController(IMapper mapper, IMarcaProductoRepository repository)
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
                var listDTO = _mapper.Map<MarcaProductoDTO[]>(list);
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
                var objetoDTO = _mapper.Map<MarcaProductoDTO>(objeto);
                return Ok(objetoDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(MarcaProductoDTO objetoDTO)
        {
            try
            {
                var objeto = _mapper.Map<MarcaProducto>(objetoDTO);

                objeto.FechaRegistro = DateTime.Now;
                objeto.EstadoId = 1; // asumiendo que 1 = activo

                await _repository.create(objeto);
                var objetoDTOFinal = _mapper.Map<MarcaProductoDTO>(objeto);
                return CreatedAtAction("Get", new { Id = objeto.MarcaProductoId }, objetoDTOFinal);
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
        public async Task<IActionResult> Put(int id, MarcaProductoDTO objetoEditedDTO)
        {
            try
            {
                var objetoEdited = _mapper.Map<MarcaProducto>(objetoEditedDTO);

                if (id != objetoEdited.MarcaProductoId) throw new Exception();

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
