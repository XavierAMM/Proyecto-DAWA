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
    public class OrdenController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IOrdenRepository _repository;

        public OrdenController(IMapper mapper, IOrdenRepository repository)
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
                var listDTO = _mapper.Map<OrdenDTO[]>(list);
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
                var objetoDTO = _mapper.Map<OrdenDTO>(objeto);
                return Ok(objetoDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(OrdenDTO objetoDTO)
        {
            try
            {
                var objeto = _mapper.Map<Orden>(objetoDTO);

                objeto.Fecha = DateTime.Now;
                objeto.EstadoId = 1; // asumiendo que 1 = activo

                await _repository.create(objeto);
                var objetoDTOFinal = _mapper.Map<OrdenDTO>(objeto);
                return CreatedAtAction("Get", new { Id = objeto.OrdenId }, objetoDTOFinal);
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
        public async Task<IActionResult> Put(int id, OrdenDTO objetoEditedDTO)
        {
            try
            {
                var objetoEdited = _mapper.Map<Orden>(objetoEditedDTO);

                if (id != objetoEdited.OrdenId) throw new Exception();

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
