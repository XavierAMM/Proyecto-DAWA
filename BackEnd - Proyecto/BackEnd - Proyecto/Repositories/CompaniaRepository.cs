using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class CompaniaRepository : ICompaniaRepository
    {
        private readonly ProyectoDWAContext _context;

        public CompaniaRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<Compania> create(Compania compania)
        {
            _context.Compania.Add(compania);
            await _context.SaveChangesAsync();
            return compania;
        }

        public async Task delete(Compania compania)
        {
            _context.Compania.Remove(compania);
            await _context.SaveChangesAsync();
        }

        public async Task<Compania> read1(int id)
        {
            return await _context.Compania.FindAsync(id);
        }

        public async Task<List<Compania>> readList()
        {
            return await _context.Compania.ToListAsync();
        }

        public async Task update(Compania companiaBase, Compania companiaEdited)
        {
            companiaBase.NombreCompania = companiaEdited.NombreCompania;
            companiaBase.Ruc = companiaEdited.Ruc;
            companiaBase.Descripcion = companiaEdited.Descripcion;
            companiaBase.RazonSocial = companiaEdited.RazonSocial;
            companiaBase.DireccionMatriz = companiaEdited.DireccionMatriz;
            companiaBase.UrlImg = companiaEdited.UrlImg;
            companiaBase.EstadoId = companiaEdited.EstadoId;

            await _context.SaveChangesAsync();
        }
    }
}
