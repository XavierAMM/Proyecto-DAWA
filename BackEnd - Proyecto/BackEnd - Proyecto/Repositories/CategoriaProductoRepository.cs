using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class CategoriaProductoRepository : ICategoriaProductoRepository
    {
        private readonly ProyectoDWAContext _context;

        public CategoriaProductoRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<CategoriaProducto> create(CategoriaProducto cproducto)
        {
            _context.CategoriaProducto.Add(cproducto);
            await _context.SaveChangesAsync();
            return cproducto;
        }

        public async Task<List<CategoriaProducto>> readList()
        {
            return await _context.CategoriaProducto.ToListAsync();
        }

        public async Task<CategoriaProducto> read1(int id)
        {
            return await _context.CategoriaProducto.FindAsync(id);
        }

        public async Task update(CategoriaProducto cproductoBase, CategoriaProducto cproductoEdited)
        {
            cproductoBase.NombreCategoria = cproductoEdited.NombreCategoria;
            cproductoBase.EstadoId = cproductoEdited.EstadoId;

            await _context.SaveChangesAsync();
        }

        public async Task delete(CategoriaProducto cproducto)
        {
            _context.CategoriaProducto.Remove(cproducto);
            await _context.SaveChangesAsync();
        }
    }
}
