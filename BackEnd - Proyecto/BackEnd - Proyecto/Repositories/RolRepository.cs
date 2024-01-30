using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class RolRepository : IRolRepository
    {
        private readonly ProyectoDWAContext _context;

        public RolRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<Rol> create(Rol rol)
        {
            _context.Rol.Add(rol);
            await _context.SaveChangesAsync();
            return rol;
        }

        public async Task<List<Rol>> readList()
        {
            return await _context.Rol.ToListAsync();
        }

        public async Task<Rol> read1(int id)
        {
            return await _context.Rol.FindAsync(id);
        }

        public async Task update(Rol rolBase, Rol rolEdited)
        {
            rolBase.Descripcion = rolEdited.Descripcion;

            await _context.SaveChangesAsync();
        }

        public async Task delete(Rol rol)
        {
            _context.Rol.Remove(rol);
            await _context.SaveChangesAsync();
        }
    }
}

