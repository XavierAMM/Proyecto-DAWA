using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface IMarcaProductoRepository
    {
        public Task<MarcaProducto> create(MarcaProducto mproducto);
        public Task<List<MarcaProducto>> readList();
        public Task<MarcaProducto> read1(int id);
        public Task update(MarcaProducto mproductoBase, MarcaProducto mproductoEdited);
        public Task delete(MarcaProducto mproducto);
    }
}
