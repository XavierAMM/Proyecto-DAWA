using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface IEstadosRepository
    {
        public Task<Estado> create(Estado estado);
        public Task<List<Estado>> readList();
        public Task<Estado> read1(int id);
        public Task update(Estado estadoBase, Estado estadoEdited);
        public Task delete(Estado estado);
    }
}
