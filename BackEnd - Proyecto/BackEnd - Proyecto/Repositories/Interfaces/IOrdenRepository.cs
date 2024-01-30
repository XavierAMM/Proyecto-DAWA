using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface IOrdenRepository
    {
        public Task<Orden> create(Orden orden);
        public Task<List<Orden>> readList();
        public Task<Orden> read1(int id);
        public Task update(Orden ordenBase, Orden ordenEdited);
        public Task delete(Orden orden);
    }
}
