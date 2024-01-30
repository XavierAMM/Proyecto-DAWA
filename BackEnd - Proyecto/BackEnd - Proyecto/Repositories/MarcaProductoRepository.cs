using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class MarcaProductoRepository : IMarcaProductoRepository
    {
        private readonly ProyectoDWAContext _context;

        public MarcaProductoRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<MarcaProducto> create(MarcaProducto mproducto)
        {
            _context.MarcaProducto.Add(mproducto);
            await _context.SaveChangesAsync();
            return mproducto;
        }

        public async Task<List<MarcaProducto>> readList()
        {
            return await _context.MarcaProducto.ToListAsync();
        }

        public async Task<MarcaProducto> read1(int id)
        {
            return await _context.MarcaProducto.FindAsync(id);
        }

        public async Task update(MarcaProducto mproductoBase, MarcaProducto mproductoEdited)
        {
            mproductoBase.NombreMarca = mproductoEdited.NombreMarca;
            mproductoBase.EstadoId = mproductoEdited.EstadoId;

            await _context.SaveChangesAsync();
        }

        public async Task delete(MarcaProducto mproducto)
        {
            _context.MarcaProducto.Remove(mproducto);
            await _context.SaveChangesAsync();
        }


    }
}

