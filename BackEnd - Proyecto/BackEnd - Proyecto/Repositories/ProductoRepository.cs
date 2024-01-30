using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly ProyectoDWAContext _context;

        public ProductoRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<Producto> create(Producto producto)
        {
            _context.Producto.Add(producto);
            await _context.SaveChangesAsync();
            return producto;
        }

        public async Task<List<Producto>> readList()
        {
            return await _context.Producto.ToListAsync();
        }

        public async Task<Producto> read1(int id)
        {
            return await _context.Producto.FindAsync(id);
        }

        public async Task update(Producto productoBase, Producto productoEdited)
        {
            productoBase.NombreProducto = productoEdited.NombreProducto;
            productoBase.Descripcion = productoEdited.Descripcion;
            productoBase.Stock = productoEdited.Stock;
            productoBase.UrlImg = productoEdited.UrlImg;
            productoBase.PrecioHora = productoEdited.PrecioHora;
            productoBase.PrecioAntes = productoEdited.PrecioAntes;
            productoBase.MarcaProductoId = productoEdited.MarcaProductoId;
            productoBase.CategoriaProductoId = productoEdited.CategoriaProductoId;
            productoBase.EstadoId = productoEdited.EstadoId;

            await _context.SaveChangesAsync();
        }

        public async Task delete(Producto producto)
        {
            _context.Producto.Remove(producto);
            await _context.SaveChangesAsync();
        }

    }
}

