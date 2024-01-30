using BackEnd___Proyecto.Models;
using BackEnd___Proyecto.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd___Proyecto.Repositories
{
    public class ItemRepository : IItemsRepository
    {
        private readonly ProyectoDWAContext _context;

        public ItemRepository(ProyectoDWAContext context)
        {
            _context = context;
        }

        public async Task<Item> create(Item item)
        {
            _context.Item.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<List<Item>> readList()
        {
            return await _context.Item.ToListAsync();
        }

        public async Task<Item> read1(int id)
        {
            return await _context.Item.FindAsync(id);
        }

        public async Task update(Item itemBase, Item itemEdited)
        {
            itemBase.ItemId = itemEdited.ItemId;
            itemBase.Cantidad = itemEdited.Cantidad;
            itemBase.UsuarioId = itemEdited.UsuarioId;
            itemBase.ProductoId = itemEdited.ProductoId;
            itemBase.OrdenId = itemEdited.OrdenId;
            itemBase.EstadoId = itemEdited.EstadoId;


            await _context.SaveChangesAsync();
        }

        public async Task delete(Item item)
        {
            _context.Item.Remove(item);
            await _context.SaveChangesAsync();
        }

    }
}


