using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class EstadoRepository : IEstadosRepository
    {
        private readonly ProyectoDWAContext _context;

        public EstadoRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<Estado> create(Estado estado)
        {
            _context.Estado.Add(estado);
            await _context.SaveChangesAsync();
            return estado;
        }

        public async Task<List<Estado>> readList()
        {
            return await _context.Estado.ToListAsync();
        }

        public async Task<Estado> read1(int id)
        {
            return await _context.Estado.FindAsync(id);
        }

        public async Task update(Estado estadoBase, Estado estadoEdited)
        {
            estadoBase.Descripcion = estadoEdited.Descripcion;

            await _context.SaveChangesAsync();
        }

        public async Task delete(Estado estado)
        {
            _context.Estado.Remove(estado);
            await _context.SaveChangesAsync();
        }
    }
}

