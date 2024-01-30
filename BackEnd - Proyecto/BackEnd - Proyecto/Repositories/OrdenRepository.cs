using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class OrdenRepository : IOrdenRepository
    {
        private readonly ProyectoDWAContext _context;

        public OrdenRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<Orden> create(Orden orden)
        {
            _context.Orden.Add(orden);
            await _context.SaveChangesAsync();
            return orden;
        }

        public async Task<List<Orden>> readList()
        {
            return await _context.Orden.ToListAsync();
        }

        public async Task<Orden> read1(int id)
        {
            return await _context.Orden.FindAsync(id);
        }

        public async Task update(Orden ordenBase, Orden ordenEdited)
        {
            ordenBase.Nombre = ordenEdited.Nombre;
            ordenBase.Apellido = ordenEdited.Apellido;
            ordenBase.Email = ordenEdited.Email;
            ordenBase.CostoEnvio = ordenEdited.CostoEnvio;
            ordenBase.Total = ordenEdited.Total;
            ordenBase.TokenOrden = ordenEdited.TokenOrden;
            ordenBase.Direccion1 = ordenEdited.Direccion1;
            ordenBase.Direccion2 = ordenEdited.Direccion2;
            ordenBase.Fecha = ordenEdited.Fecha;
            ordenBase.EstadoId = ordenEdited.EstadoId;
            ordenBase.UsuarioId = ordenEdited.UsuarioId;

            await _context.SaveChangesAsync();
        }

        public async Task delete(Orden orden)
        {
            _context.Orden.Remove(orden);
            await _context.SaveChangesAsync();
        }

    }
}

