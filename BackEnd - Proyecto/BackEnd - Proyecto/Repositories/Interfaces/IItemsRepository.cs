using BackEnd___Proyecto.Models;

namespace BackEnd___Proyecto.Repositories.Interfaces
{
    public interface IItemsRepository
    {
        public Task<Item> create(Item item);
        public Task<List<Item>> readList();
        public Task<Item> read1(int id);
        public Task update(Item itemBase, Item itemEdited);
        public Task delete(Item item);

    }
}

