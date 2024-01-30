using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        public Task<Usuario> create(Usuario usuario);
        public Task<List<Usuario>> readList();
        public Task<Usuario> read1(int id);
        public Task update(Usuario usuarioBase, Usuario usuarioEdited);
        public Task delete(Usuario usuario);
    }
}
