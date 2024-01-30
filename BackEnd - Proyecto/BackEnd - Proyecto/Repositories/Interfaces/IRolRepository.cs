using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface IRolRepository
    {
        public Task<Rol> create(Rol rol);
        public Task<List<Rol>> readList();
        public Task<Rol> read1(int id);
        public Task update(Rol rolBase, Rol rolEdited);
        public Task delete(Rol rol);
    }
}
