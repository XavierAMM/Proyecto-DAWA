using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface ICategoriaProductoRepository
    {
        public Task<CategoriaProducto> create(CategoriaProducto cproducto);
        public Task<List<CategoriaProducto>> readList();
        public Task<CategoriaProducto> read1(int id);
        public Task update(CategoriaProducto cproductoBase, CategoriaProducto cproductoEdited);
        public Task delete(CategoriaProducto cproducto);
    }
}
