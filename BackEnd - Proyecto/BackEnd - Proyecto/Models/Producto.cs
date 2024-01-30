using System;
using System.Collections.Generic;

namespace BackEnd___Proyecto.Models;

public partial class Producto
{
    public int ProductoId { get; set; }

    public string? NombreProducto { get; set; }

    public string? Descripcion { get; set; }

    public int? Stock { get; set; }

    public string? UrlImg { get; set; }

    public decimal? PrecioHora { get; set; }

    public decimal? PrecioAntes { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public int? MarcaProductoId { get; set; }

    public int? CategoriaProductoId { get; set; }

    public int? EstadoId { get; set; }

    public virtual CategoriaProducto? CategoriaProducto { get; set; }

    public virtual Estado? Estado { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();

    public virtual MarcaProducto? MarcaProducto { get; set; }
}
