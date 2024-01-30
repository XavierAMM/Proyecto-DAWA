namespace BackEnd___Proyecto.Models.DTO
{
    public class ProductoDTO
    {
        public int ProductoId { get; set; }

        public string? NombreProducto { get; set; }

        public string? Descripcion { get; set; }

        public int? Stock { get; set; }

        public string? UrlImg { get; set; }

        public decimal? PrecioHora { get; set; }

        public decimal? PrecioAntes { get; set; }

        public int? MarcaProductoId { get; set; }

        public int? CategoriaProductoId { get; set; }

        public int? EstadoId { get; set; } 
    }
}
