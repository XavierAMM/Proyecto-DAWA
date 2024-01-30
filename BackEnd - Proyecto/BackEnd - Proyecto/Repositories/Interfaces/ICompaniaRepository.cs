using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface ICompaniaRepository
    {
        public Task<Compania> create(Compania compania);
        public Task<List<Compania>> readList();
        public Task<Compania> read1(int id);
        public Task update(Compania companiaBase, Compania companiaEdited);
        public Task delete(Compania compania);
    }
}
