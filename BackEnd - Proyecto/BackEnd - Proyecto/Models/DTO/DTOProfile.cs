using AutoMapper;

namespace BackEnd___Proyecto.Models.DTO
{
    public class DTOProfile : Profile
    {
        public DTOProfile()
        {
            CreateMap<CategoriaProductoDTO, CategoriaProducto>();
            CreateMap<CategoriaProducto, CategoriaProductoDTO>();

            CreateMap<CompaniaDTO, Compania>();
            CreateMap<Compania, CompaniaDTO>();

            CreateMap<EstadoDTO, Estado>();
            CreateMap<Estado, EstadoDTO>();

            CreateMap<ItemDTO, Item>();
            CreateMap<Item, ItemDTO>();

            CreateMap<MarcaProductoDTO, MarcaProducto>();
            CreateMap<MarcaProducto, MarcaProductoDTO>();

            CreateMap<OrdenDTO, Orden>();
            CreateMap<Orden, OrdenDTO>();

            CreateMap<Producto, ProductoDTO>();
            CreateMap<ProductoDTO, Producto>();

            CreateMap<RolDTO, Rol>();
            CreateMap<Rol, RolDTO>();

            CreateMap<UsuarioDTO, Usuario>();
            CreateMap<Usuario, UsuarioDTO>();
        }
    }
}
