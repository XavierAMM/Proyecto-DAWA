using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ProyectoDWAContext _context;

        public UsuarioRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<Usuario> create(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<List<Usuario>> readList()
        {
            return await _context.Usuario.ToListAsync();
        }

        public async Task<Usuario> read1(int id)
        {
            return await _context.Usuario.FindAsync(id);
        }

        public async Task update(Usuario usuarioBase, Usuario usuarioEdited)
        {
            usuarioBase.Nombre = usuarioEdited.Nombre;
            usuarioBase.Apellido = usuarioEdited.Apellido;
            usuarioBase.Email = usuarioEdited.Email;
            usuarioBase.Password = usuarioEdited.Password;
            usuarioBase.Maxintentos = usuarioEdited.Maxintentos;
            usuarioBase.IntentosFallidos = usuarioEdited.IntentosFallidos;
            usuarioBase.EstadoId = usuarioEdited.EstadoId;
            usuarioBase.RolId = usuarioEdited.RolId;

            await _context.SaveChangesAsync();
        }

        public async Task delete(Usuario usuario)
        {
            _context.Usuario.Remove(usuario);
            await _context.SaveChangesAsync();
        }
    }
}

