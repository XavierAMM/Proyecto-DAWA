using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface IProductoRepository
    {
        public Task<Producto> create(Producto producto);
        public Task<List<Producto>> readList();
        public Task<Producto> read1(int id);
        public Task update(Producto productoBase, Producto productoEdited);
        public Task delete(Producto producto);

    }
}
